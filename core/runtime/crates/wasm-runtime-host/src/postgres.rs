use bytes::Bytes;
use http_body_util::BodyExt;
use tokio_postgres::Client;
use trailbase_sqlvalue::SqlValue;
use trailbase_wasm_common::{PostgresRequest, PostgresResponse};
use wasmtime_wasi_http::bindings::http::types::ErrorCode;

pub(crate) struct OwnedPgTx {
    pub conn: bb8::PooledConnection<'static, bb8_postgres::PostgresConnectionManager<tokio_postgres::NoTls>>,
}

pub(crate) async fn handle_postgres_request(
    client: &Client,
    request: hyper::Request<wasmtime_wasi_http::body::HyperOutgoingBody>,
) -> Result<wasmtime_wasi_http::types::IncomingResponse, ErrorCode> {
    let headers = request.headers().clone();
    let schema = headers.get("X-Project-Schema").and_then(|v| v.to_str().ok());

    if let Some(schema) = schema {
        // Validate schema name to prevent SQL injection
        if schema.chars().all(|c| c.is_alphanumeric() || c == '_') {
            let _ = client.batch_execute(&format!("SET search_path TO {}, public", schema)).await;
        }
    }

    return match handle_postgres_request_impl(client, request).await {
        Ok(response) => to_response(response),
        Err(err) => to_response(PostgresResponse::Error(err)),
    };
}

async fn handle_postgres_request_impl(
    client: &Client,
    request: hyper::Request<wasmtime_wasi_http::body::HyperOutgoingBody>,
) -> Result<PostgresResponse, String> {
    return match request.uri().path() {
        "/execute" => {
            let pg_request = to_request(request).await?;
            let params = params_to_pg(&pg_request.params);
            let rows_affected = client
                .execute(&pg_request.query, &params)
                .await
                .map_err(|e| e.to_string())?;

            Ok(PostgresResponse::Execute { rows_affected })
        }
        "/query" => {
            let pg_request = to_request(request).await?;
            let params = params_to_pg(&pg_request.params);
            let rows = client
                .query(&pg_request.query, &params)
                .await
                .map_err(|e| e.to_string())?;

            let mut json_rows = Vec::new();
            for row in rows {
                let mut json_row = Vec::new();
                for i in 0..row.columns().len() {
                    let val: SqlValue = row.get(i);
                    json_row.push(val);
                }
                json_rows.push(json_row);
            }

            Ok(PostgresResponse::Query { rows: json_rows })
        }
        "/tx-begin" => {
            client.batch_execute("BEGIN").await.map_err(|e| e.to_string())?;
            Ok(PostgresResponse::TxBegin)
        }
        "/tx-commit" => {
            client.batch_execute("COMMIT").await.map_err(|e| e.to_string())?;
            Ok(PostgresResponse::TxCommit)
        }
        "/tx-rollback" => {
            client.batch_execute("ROLLBACK").await.map_err(|e| e.to_string())?;
            Ok(PostgresResponse::TxRollback)
        }
        _ => Err("Not found".to_string()),
    };
}

pub(crate) async fn handle_postgres_tx_request(
    tx: &tokio_postgres::Transaction<'_>,
    request: hyper::Request<wasmtime_wasi_http::body::HyperOutgoingBody>,
) -> Result<PostgresResponse, String> {
    return match request.uri().path() {
        "/execute" => {
            let pg_request = to_request(request).await?;
            let params = params_to_pg(&pg_request.params);
            let rows_affected = tx
                .execute(&pg_request.query, &params)
                .await
                .map_err(|e| e.to_string())?;

            Ok(PostgresResponse::Execute { rows_affected })
        }
        "/query" => {
            let pg_request = to_request(request).await?;
            let params = params_to_pg(&pg_request.params);
            let rows = tx
                .query(&pg_request.query, &params)
                .await
                .map_err(|e| e.to_string())?;

            let mut json_rows = Vec::new();
            for row in rows {
                let mut json_row = Vec::new();
                for i in 0..row.columns().len() {
                    let val: SqlValue = row.get(i);
                    json_row.push(val);
                }
                json_rows.push(json_row);
            }

            Ok(PostgresResponse::Query { rows: json_rows })
        }
        _ => Err("Not found".to_string()),
    };
}

async fn to_request(
    request: hyper::Request<wasmtime_wasi_http::body::HyperOutgoingBody>,
) -> Result<PostgresRequest, String> {
    let (_parts, body) = request.into_parts();
    let bytes: Bytes = body.collect().await.map_err(|e| e.to_string())?.to_bytes();
    return serde_json::from_slice(&bytes).map_err(|e| e.to_string());
}

fn to_response(
    response: PostgresResponse,
) -> Result<wasmtime_wasi_http::types::IncomingResponse, ErrorCode> {
    let body =
        serde_json::to_vec(&response).map_err(|err| ErrorCode::InternalError(Some(err.to_string())))?;

    let resp = http::Response::builder()
        .status(200)
        .body(crate::sqlite::bytes_to_body(Bytes::from_owner(body)))
        .map_err(|err| ErrorCode::InternalError(Some(err.to_string())))?;

    return Ok(wasmtime_wasi_http::types::IncomingResponse {
        resp,
        worker: None,
        between_bytes_timeout: std::time::Duration::ZERO,
    });
}

fn params_to_pg(params: &[SqlValue]) -> Vec<&(dyn postgres_types::ToSql + Sync)> {
    params
        .iter()
        .map(|p| p as &(dyn postgres_types::ToSql + Sync))
        .collect()
}
