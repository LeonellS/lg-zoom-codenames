use rand::{
    distributions::{Distribution, Standard},
    Rng,
};
use serde::Serialize;

#[derive(Debug, PartialEq, Copy, Clone, Serialize)]
pub enum StartingTeam {
    Red,
    Blue,
}

impl Distribution<StartingTeam> for Standard {
    fn sample<R: Rng + ?Sized>(&self, rng: &mut R) -> StartingTeam {
        match rng.gen_range(0..=1) {
            0 => StartingTeam::Red,
            _ => StartingTeam::Blue,
        }
    }
}
