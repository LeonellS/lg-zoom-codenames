use crate::game::StartingTeam;
use rand::seq::SliceRandom;
use serde::Serialize;
use uuid::Uuid;

static WORD_LIST: &'static str = include_str!("../words.json");

const MAX_CARDS: usize = 25;
const STARTING_TEAM_CARDS: usize = 9;
const OTHER_TEAM_CARDS: usize = 8;
const ASSASSIN_CARDS: usize = 1;

#[derive(Debug, PartialEq, Copy, Clone, Serialize)]
pub enum CardType {
    Assassin,
    Red,
    Blue,
    Bystander,
}

#[derive(Debug, PartialEq, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Card {
    pub uuid: Uuid,
    pub word: String,
    pub card_type: CardType,
    pub turned: bool,
}

pub fn generate_cards(starting_team: &StartingTeam) -> Vec<Card> {
    let mut rng = &mut rand::thread_rng();

    let starting_team_card_type = match starting_team {
        StartingTeam::Red => CardType::Red,
        StartingTeam::Blue => CardType::Blue,
    };

    let other_team_card_type = match starting_team {
        StartingTeam::Red => CardType::Blue,
        StartingTeam::Blue => CardType::Red,
    };

    let word_list = serde_json::from_str::<Vec<String>>(WORD_LIST).unwrap();
    let word_list: Vec<String> = word_list
        .choose_multiple(&mut rng, MAX_CARDS)
        .cloned()
        .collect();

    let starting_team_words: Vec<String> = word_list
        .choose_multiple(&mut rng, STARTING_TEAM_CARDS)
        .cloned()
        .collect();

    let other_team_words: Vec<String> = word_list
        .clone()
        .into_iter()
        .filter(|w| !starting_team_words.contains(&w))
        .collect::<Vec<String>>()
        .choose_multiple(&mut rng, OTHER_TEAM_CARDS)
        .cloned()
        .collect();

    let assassin_words: Vec<String> = word_list
        .clone()
        .into_iter()
        .filter(|w| !(starting_team_words.contains(&w) || other_team_words.contains(&w)))
        .collect::<Vec<String>>()
        .choose_multiple(&mut rng, ASSASSIN_CARDS)
        .cloned()
        .collect();

    let all_cards: Vec<Card> = word_list
        .into_iter()
        .map(|word| {
            let card_type: CardType = if starting_team_words.contains(&word) {
                starting_team_card_type
            } else if other_team_words.contains(&word) {
                other_team_card_type
            } else if assassin_words.contains(&word) {
                CardType::Assassin
            } else {
                CardType::Bystander
            };

            Card {
                uuid: Uuid::new_v4(),
                word,
                card_type,
                turned: false,
            }
        })
        .collect();

    all_cards
}

#[cfg(test)]
mod tests {
    use super::*;
    use spectral::{assert_that, vec::VecAssertions};

    #[test]
    fn test_generate_cards() {
        let expected_cards = 25;
        let expected_red_cards = 9;
        let expected_blue_cards = 8;
        let expected_assassin_cards = 1;

        let result = generate_cards(&StartingTeam::Red);

        assert_that(&result).has_length(expected_cards);

        let result_red_cards: Vec<Card> = result
            .clone()
            .into_iter()
            .filter(|v| v.card_type == CardType::Red)
            .collect();

        assert_that(&result_red_cards).has_length(expected_red_cards);

        let result_blue_cards: Vec<Card> = result
            .clone()
            .into_iter()
            .filter(|v| v.card_type == CardType::Blue)
            .collect();

        assert_that(&result_blue_cards).has_length(expected_blue_cards);

        let result_assassin_cards: Vec<Card> = result
            .clone()
            .into_iter()
            .filter(|v| v.card_type == CardType::Assassin)
            .collect();

        assert_that(&result_assassin_cards).has_length(expected_assassin_cards);
    }
}
