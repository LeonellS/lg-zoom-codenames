use actix::Actor;
use actix_files::Files;
use actix_web::middleware::normalize::TrailingSlash;
use actix_web::middleware::{Logger, NormalizePath};
use actix_web::{App, HttpServer};
use env_logger::Env;
use screen_share_codenames_server::server::Server;
use std::io;

fn init_logging() {
    env_logger::Builder::from_env(Env::default().default_filter_or("debug")).init();
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    init_logging();

    let server = Server::new().start();

    let app = move || {
        App::new()
            .wrap(Logger::default())
            .wrap(NormalizePath::new(TrailingSlash::Trim))
            .data(server.clone())
            .configure(screen_share_codenames_server::app)
            .service(Files::new("/public", "public"))
    };

    HttpServer::new(app).bind("127.0.0.1:80")?.run().await
}
