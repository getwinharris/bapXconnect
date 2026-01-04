#![forbid(unsafe_code, clippy::unwrap_used)]
#![allow(clippy::needless_return)]
#![warn(clippy::await_holding_lock, clippy::inefficient_to_string)]

use base64::prelude::*;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, thiserror::Error)]
pub enum DecodeError {
  #[error("Base64: {0}")]
  Base64(base64::DecodeError),
  #[error("Hex")]
  Hex,
}

#[derive(Clone, Debug, Deserialize, Serialize, PartialEq, TS)]
#[ts(export)]
pub enum Blob {
  Array(Vec<u8>),
  /// NOTE: default for reads, given it has best compression-ratio.
  Base64UrlSafe(String),
  Hex(String),
}

impl Blob {
  pub fn to_b64_url_safe(&self) -> Result<String, DecodeError> {
    return Ok(match self {
      Blob::Array(v) => BASE64_URL_SAFE.encode(v),
      Blob::Base64UrlSafe(s) => s.clone(),
      Blob::Hex(s) => BASE64_URL_SAFE.encode(decode_hex(s)?),
    });
  }

  pub fn into_b64_url_safe(self) -> Result<String, DecodeError> {
    return Ok(match self {
      Blob::Array(v) => BASE64_URL_SAFE.encode(&v),
      Blob::Base64UrlSafe(s) => s,
      Blob::Hex(s) => BASE64_URL_SAFE.encode(decode_hex(&s)?),
    });
  }

  pub fn to_bytes(&self) -> Result<Vec<u8>, DecodeError> {
    return Ok(match self {
      Blob::Array(v) => v.clone(),
      Blob::Base64UrlSafe(s) => BASE64_URL_SAFE.decode(s).map_err(DecodeError::Base64)?,
      Blob::Hex(s) => decode_hex(s)?,
    });
  }

  pub fn into_bytes(self) -> Result<Vec<u8>, DecodeError> {
    return Ok(match self {
      Blob::Array(v) => v,
      Blob::Base64UrlSafe(s) => BASE64_URL_SAFE.decode(&s).map_err(DecodeError::Base64)?,
      Blob::Hex(s) => decode_hex(&s)?,
    });
  }
}

/// Mimic's rusqlite's Value but is JS/JSON serializable and supports multiple blob encodings..
#[derive(Clone, Debug, Deserialize, Serialize, PartialEq, TS)]
#[ts(export)]
pub enum SqlValue {
  Null,
  Integer(i64),
  Real(f64),
  Text(String),
  Blob(Blob),
}

impl Default for SqlValue {
  fn default() -> Self {
    return SqlValue::Null;
  }
}

#[cfg(feature = "rusqlite")]
impl TryFrom<SqlValue> for rusqlite::types::Value {
  type Error = DecodeError;

  fn try_from(value: SqlValue) -> Result<Self, Self::Error> {
    use rusqlite::types::Value;

    return Ok(match value {
      SqlValue::Null => Value::Null,
      SqlValue::Integer(v) => Value::Integer(v),
      SqlValue::Real(v) => Value::Real(v),
      SqlValue::Text(v) => Value::Text(v),
      SqlValue::Blob(b) => match b {
        Blob::Array(v) => Value::Blob(v),
        Blob::Base64UrlSafe(v) => {
          Value::Blob(BASE64_URL_SAFE.decode(v).map_err(DecodeError::Base64)?)
        }
        Blob::Hex(v) => Value::Blob(decode_hex(&v)?),
      },
    });
  }
}

#[cfg(feature = "rusqlite")]
impl From<rusqlite::types::Value> for SqlValue {
  fn from(value: rusqlite::types::Value) -> Self {
    use rusqlite::types::Value;

    return match value {
      Value::Null => SqlValue::Null,
      Value::Integer(v) => SqlValue::Integer(v),
      Value::Real(v) => SqlValue::Real(v),
      Value::Text(v) => SqlValue::Text(v),
      Value::Blob(v) => SqlValue::Blob(Blob::Base64UrlSafe(BASE64_URL_SAFE.encode(v))),
    };
  }
}

#[cfg(feature = "rusqlite")]
impl From<&rusqlite::types::Value> for SqlValue {
  fn from(value: &rusqlite::types::Value) -> Self {
    use rusqlite::types::Value;

    return match value {
      Value::Null => SqlValue::Null,
      Value::Integer(v) => SqlValue::Integer(*v),
      Value::Real(v) => SqlValue::Real(*v),
      Value::Text(v) => SqlValue::Text(v.clone()),
      Value::Blob(v) => SqlValue::Blob(Blob::Base64UrlSafe(BASE64_URL_SAFE.encode(v))),
    };
  }
}

#[cfg(feature = "postgres")]
impl postgres_types::ToSql for SqlValue {
  fn to_sql(
    &self,
    ty: &postgres_types::Type,
    out: &mut bytes::BytesMut,
  ) -> Result<postgres_types::IsNull, Box<dyn std::error::Error + Sync + Send>> {
    match self {
      SqlValue::Null => Ok(postgres_types::IsNull::Yes),
      SqlValue::Integer(v) => v.to_sql(ty, out),
      SqlValue::Real(v) => v.to_sql(ty, out),
      SqlValue::Text(v) => v.to_sql(ty, out),
      SqlValue::Blob(b) => {
        let bytes = b.to_bytes().map_err(|e| Box::new(e) as Box<dyn std::error::Error + Sync + Send>)?;
        bytes.to_sql(ty, out)
      }
    }
  }

  fn accepts(ty: &postgres_types::Type) -> bool {
    matches!(
      *ty,
      postgres_types::Type::INT8
        | postgres_types::Type::FLOAT8
        | postgres_types::Type::TEXT
        | postgres_types::Type::VARCHAR
        | postgres_types::Type::BYTEA
        | postgres_types::Type::BOOL
    )
  }

  postgres_types::to_sql_checked!();
}

#[cfg(feature = "postgres")]
impl<'a> postgres_types::FromSql<'a> for SqlValue {
  fn from_sql(
    ty: &postgres_types::Type,
    raw: &'a [u8],
  ) -> Result<Self, Box<dyn std::error::Error + Sync + Send>> {
    match *ty {
      postgres_types::Type::INT8 | postgres_types::Type::INT4 | postgres_types::Type::INT2 => {
        let v = i64::from_sql(ty, raw)?;
        Ok(SqlValue::Integer(v))
      }
      postgres_types::Type::FLOAT8 | postgres_types::Type::FLOAT4 => {
        let v = f64::from_sql(ty, raw)?;
        Ok(SqlValue::Real(v))
      }
      postgres_types::Type::TEXT | postgres_types::Type::VARCHAR => {
        let v = String::from_sql(ty, raw)?;
        Ok(SqlValue::Text(v))
      }
      postgres_types::Type::BYTEA => {
        let v = Vec::<u8>::from_sql(ty, raw)?;
        Ok(SqlValue::Blob(Blob::Base64UrlSafe(BASE64_URL_SAFE.encode(v))))
      }
      postgres_types::Type::BOOL => {
        let v = bool::from_sql(ty, raw)?;
        Ok(SqlValue::Integer(if v { 1 } else { 0 }))
      }
      _ => Err(format!("Unsupported type: {:?}", ty).into()),
    }
  }

  fn accepts(ty: &postgres_types::Type) -> bool {
    matches!(
      *ty,
      postgres_types::Type::INT8
        | postgres_types::Type::INT4
        | postgres_types::Type::INT2
        | postgres_types::Type::FLOAT8
        | postgres_types::Type::FLOAT4
        | postgres_types::Type::TEXT
        | postgres_types::Type::VARCHAR
        | postgres_types::Type::BYTEA
        | postgres_types::Type::BOOL
    )
  }
}

fn decode_hex(s: &str) -> Result<Vec<u8>, DecodeError> {
  if !s.len().is_multiple_of(2) {
    return Err(DecodeError::Hex);
  }

  return (0..s.len())
    .step_by(2)
    .map(|i| u8::from_str_radix(&s[i..i + 2], 16).map_err(|_| DecodeError::Hex))
    .collect();
}
