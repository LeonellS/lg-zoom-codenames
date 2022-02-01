use crate::game::Game;
use crate::spymaster::Spymaster;
use actix::{Addr, Message};

#[derive(Message)]
#[rtype(result = "()")]
pub struct GameStart {
    pub game: Addr<Game>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct GameStop {
    pub game: Addr<Game>,
}

#[derive(Message)]
#[rtype(result = "Option<Addr<Game>>")]
pub struct GameExist {
    pub code: String,
}

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
