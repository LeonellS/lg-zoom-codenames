use actix_files::NamedFile;
use actix_web::middleware::normalize::TrailingSlash;
use actix_web::middleware::NormalizePath;
use actix_web::{get, web};
use std::io;

pub fn app(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/screen-share-codenames")
            .wrap(NormalizePath::new(TrailingSlash::Trim))
            .service(index)
            .service(game)
            .service(spymaster),
    );
}

#[get("")]
async fn index() -> io::Result<NamedFile> {
    Ok(NamedFile::open("./views/index.html")?)
}

#[get("/game")]
async fn game() -> io::Result<NamedFile> {
    Ok(NamedFile::open("./views/game.html")?)
}

#[get("/spymaster")]
async fn spymaster() -> io::Result<NamedFile> {
    Ok(NamedFile::open("./views/spymaster.html")?)
}
