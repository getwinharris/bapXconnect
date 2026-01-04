use axum::{Json, extract::State, http::StatusCode};
use serde::Deserialize;
use crate::app_state::AppState;
use crate::connection::AttachedDatabase;
use log::*;

#[derive(Deserialize)]
pub struct ProjectInitRequest {
    #[serde(rename = "projectId")]
    pub project_id: String,
}

pub async fn project_init_handler(
    State(state): State<AppState>,
    Json(payload): Json<ProjectInitRequest>,
) -> Result<StatusCode, (StatusCode, String)> {
    info!("Initializing Trailbase project: {}", payload.project_id);

    let attached_db = AttachedDatabase::from_data_dir(&state.data_dir(), &payload.project_id);
    
    // Ensure the directory exists
    if let Some(parent) = attached_db.path.parent() {
        if let Err(e) = std::fs::create_dir_all(parent) {
            error!("Failed to create database directory: {}", e);
            return Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string()));
        }
    }

    // Just touching the file is enough for Trailbase to recognize it when requested
    if !attached_db.path.exists() {
        if let Err(e) = std::fs::File::create(&attached_db.path) {
            error!("Failed to create database file: {}", e);
            return Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string()));
        }
    }

    Ok(StatusCode::CREATED)
}
