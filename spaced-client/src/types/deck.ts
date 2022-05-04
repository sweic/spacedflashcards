export interface Card {
    front: string,
    back: string
}

export interface DeckType {
    title: string,
    id: string,
    desc: string,
    cards: Card[],
    count: number,
    rrule: string
}