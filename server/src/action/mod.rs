use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Action {
    pub action: String,
    pub payload: Option<String>,
}

pub fn stringify<T: Serialize>(action: &'static str, payload: T) -> serde_json::Result<String> {
    let action = Action {
        action: action.into(),
        payload: Some(serde_json::to_string(&payload)?),
    };

    Ok(serde_json::to_string(&action)?)
}

pub fn stringify_without_payload(action: &'static str) -> serde_json::Result<String> {
    let action = Action {
        action: action.into(),
        payload: None,
    };

    Ok(serde_json::to_string(&action)?)
}
