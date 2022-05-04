export interface UserDashboardDeckType {
    id: string,
    rrule: string,
    count: number,
    completion: number
}

export interface UserDashboardType {
    username: string,
    lastUpdated: Date,
    decks: UserDashboardDeckType[]
}

export interface DashboardClientType {
    total: number,
    decks: DeckClientType[],
    currentCompletion: number
}
export interface DeckClientType {
    id: string,
    title?: string,
    desc?: string,
    completion: number,
    count: number
}
export interface UserDeckType {
    username: string,
    total: number,
    decks: Deck[]
}
export interface Deck {
    title: string,
    id: string ,
    desc: string,
    cards: Card[]
}
export interface Card {
    front: string,
    back: string
}


