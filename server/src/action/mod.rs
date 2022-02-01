use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Action {
    pub action: String,
    pub payload: Option<String>,
}
