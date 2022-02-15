import { Card } from '../game/card'
import { StartingTeam } from '../game/team'

interface GameStartPayload {
    code: string
    startingTeam: StartingTeam
    cards: Card[]
}

interface NewGamePayload {
    startingTeam: StartingTeam
    cards: Card[]
}

interface NewWordListPayload {
    cards: Card[]
}

interface ClickCardPayload {
    cardUuid: string
}

interface SendWordListPayload {
    cards: Card[]
}

interface JoinGamePayload {
    code: string
}

export {
    GameStartPayload,
    NewGamePayload,
    NewWordListPayload,
    ClickCardPayload,
    SendWordListPayload,
    JoinGamePayload,
}
