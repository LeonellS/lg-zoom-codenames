use crate::game::{Card, Game};
use crate::spymaster::Spymaster;
use actix::{Addr, Message};
use uuid::Uuid;

// Server -> Game

#[derive(Message)]
#[rtype(result = "()")]
pub struct AddSpymaster {
    pub spymaster: Addr<Spymaster>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct RemoveSpymaster {
    pub spymaster: Addr<Spymaster>,
}

// Game -> Server

#[derive(Message)]
#[rtype(result = "String")]
pub struct GameStart {
    pub game: Addr<Game>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct GameStop {
    pub game: Addr<Game>,
}

// Game -> Spymaster

#[derive(Message)]
#[rtype(result = "()")]
pub struct SendWordList {
    pub cards: Vec<Card>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct RemoveGame;

#[derive(Message)]
#[rtype(result = "()")]
pub struct ClickCard {
    pub card_uuid: Uuid,
}

// Spymaster -> Server

#[derive(Message)]
#[rtype(result = "()")]
pub struct SpymasterStart {
    pub spymaster: Addr<Spymaster>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct SpymasterStop {
    pub spymaster: Addr<Spymaster>,
}

#[derive(Message)]
#[rtype(result = "Option<Addr<Game>>")]
pub struct JoinGame {
    pub code: String,
    pub spymaster: Addr<Spymaster>,
}
