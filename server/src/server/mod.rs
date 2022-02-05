mod game_start;
mod game_stop;
mod join_game;
mod spymaster_start;
mod spymaster_stop;

use crate::game::Game;
use crate::spymaster::Spymaster;
use actix::{Actor, Addr, Context};
use rand::Rng;
use std::collections::HashMap;

const CHARACTER_SET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CODE_SIZE: usize = 4;

pub struct Server {
    games: HashMap<String, Addr<Game>>,
    spymasters: Vec<Addr<Spymaster>>,
}

impl Server {
    pub fn new() -> Self {
        Self {
            games: HashMap::new(),
            spymasters: Vec::new(),
        }
    }

    fn create_code(&self) -> String {
        let mut rng = rand::thread_rng();

        let code = (0..CODE_SIZE)
            .map(|_| {
                let index = rng.gen_range(0..CHARACTER_SET.len());

                CHARACTER_SET[index] as char
            })
            .collect();

        code
    }
}

impl Actor for Server {
    type Context = Context<Self>;
}
