use crate::game::Game;
use crate::message::{GameExist, GameStart, GameStop, SpymasterStart, SpymasterStop};
use crate::spymaster::Spymaster;
use actix::{Actor, Addr, Context, Handler, MessageResult};
use log::debug;
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

impl Handler<GameStart> for Server {
    type Result = ();

    fn handle(&mut self, GameStart { game }: GameStart, _context: &mut Self::Context) {
        let mut code = self.create_code();

        while self.games.keys().any(|k| *k == code) {
            code = self.create_code();
        }

        self.games.insert(code.clone(), game);

        debug!("(start) games: {:?}", self.games.keys());
    }
}

impl Handler<GameStop> for Server {
    type Result = ();

    fn handle(&mut self, GameStop { game }: GameStop, _context: &mut Self::Context) {
        self.games.retain(|_, v| *v != game);

        debug!("(stop) games: {:?}", self.games.keys());
    }
}

impl Handler<GameExist> for Server {
    type Result = MessageResult<GameExist>;

    fn handle(
        &mut self,
        GameExist { code }: GameExist,
        _context: &mut Self::Context,
    ) -> Self::Result {
        if let Some(addr) = self.games.get(&code) {
            debug!("game exists: {}", &code);
            return MessageResult(Some(addr.clone()));
        }

        debug!("game does not exists: {}", &code);
        MessageResult(Option::None)
    }
}

impl Handler<SpymasterStart> for Server {
    type Result = ();

    fn handle(
        &mut self,
        SpymasterStart { spymaster }: SpymasterStart,
        _context: &mut Self::Context,
    ) {
        self.spymasters.push(spymaster);

        debug!("(start) spymasters: {}", self.spymasters.len());
    }
}

impl Handler<SpymasterStop> for Server {
    type Result = ();

    fn handle(&mut self, SpymasterStop { spymaster }: SpymasterStop, _context: &mut Self::Context) {
        self.spymasters.retain(|v| *v != spymaster);

        debug!("(end) spymasters: {}", self.spymasters.len());
    }
}
