use crate::game::{Card, StartingTeam};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

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

// Receive from Game, Send to Spymaster

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ClickCardAction {
    pub card_uuid: Uuid,
}

// Send to Game

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GameStartAction {
    pub code: String,
    pub starting_team: StartingTeam,
    pub cards: Vec<Card>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NewGameAction {
    pub starting_team: StartingTeam,
    pub cards: Vec<Card>,
}

#[derive(Serialize)]
pub struct NewWordListAction {
    pub cards: Vec<Card>,
}

// Receive from Spymaster

#[derive(Deserialize)]
pub struct JoinGameAction {
    pub code: String,
}

// Send to Spymaster

#[derive(Serialize)]
pub struct SendWordListAction {
    pub cards: Vec<Card>,
}
