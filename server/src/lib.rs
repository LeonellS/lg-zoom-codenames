mod action;
mod game;
mod message;
pub mod server;
mod spymaster;

use crate::game::Game;
use crate::server::Server;
use crate::spymaster::Spymaster;
use actix::Addr;
use actix_files::NamedFile;
use actix_web::middleware::normalize::TrailingSlash;
use actix_web::middleware::NormalizePath;
use actix_web::{get, web, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use std::io;

pub fn app(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/screen-share-codenames")
            .wrap(NormalizePath::new(TrailingSlash::Trim))
            .service(index_view)
            .service(game_view)
            .service(web::resource("/game/ws").to(game_ws))
            .service(spymaster_view)
            .service(web::resource("/spymaster/ws").to(spymaster_ws)),
    );
}

#[get("")]
async fn index_view() -> io::Result<NamedFile> {
    Ok(NamedFile::open("./views/index.html")?)
}

#[get("/game")]
async fn game_view() -> io::Result<NamedFile> {
    Ok(NamedFile::open("./views/game.html")?)
}

async fn game_ws(
    request: HttpRequest,
    stream: web::Payload,
    server: web::Data<Addr<Server>>,
) -> Result<HttpResponse, actix_web::Error> {
    ws::start(Game::new(server.get_ref().clone()), &request, stream)
}

#[get("/spymaster")]
async fn spymaster_view() -> io::Result<NamedFile> {
    Ok(NamedFile::open("./views/spymaster.html")?)
}

async fn spymaster_ws(
    request: HttpRequest,
    stream: web::Payload,
    server: web::Data<Addr<Server>>,
) -> Result<HttpResponse, actix_web::Error> {
    ws::start(Spymaster::new(server.get_ref().clone()), &request, stream)
}
