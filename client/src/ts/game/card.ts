enum CardType {
    Assassin = 'Assassin',
    Red = 'Red',
    Blue = 'Blue',
    Bystander = 'Bystander',
}

interface Card {
    uuid: string
    word: string
    type: CardType
    turned: boolean
}

export { Card, CardType }
