use crate::game::{Card, StartingTeam};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ClickCardPayload {
    pub card_uuid: Uuid,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GameStartPayload {
    pub code: String,
    pub starting_team: StartingTeam,
    pub cards: Vec<Card>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NewGamePayload {
    pub starting_team: StartingTeam,
    pub cards: Vec<Card>,
}

#[derive(Serialize)]
pub struct NewWordListPayload {
    pub cards: Vec<Card>,
}

#[derive(Deserialize)]
pub struct JoinGamePayload {
    pub code: String,
}

#[derive(Serialize)]
pub struct SendWordListPayload {
    pub cards: Vec<Card>,
}
