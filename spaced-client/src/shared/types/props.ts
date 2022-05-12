import React from "react"
import { DeckType, Card } from "./deck"
import { UserActivityDeck } from "./social"

export interface ControllerPropTypes{
    deleteCard: () => void, 
    previousCard: () => void,
    nextCard: () => void,
    addCard: () => void,
    curr: number,
    deck: Card[]
}

export interface TextEditorPropTypes {
    text: string,
    debounceFunction: React.Dispatch<React.SetStateAction<string>>
}

export interface DetailsPropTypes {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>
    desc: string,
    setDesc: React.Dispatch<React.SetStateAction<string>>,
    setCurr: React.Dispatch<React.SetStateAction<number>>,
    count: number | undefined,
    setCount: React.Dispatch<React.SetStateAction<number | undefined>>,
    daySelect: string[],
    handleDaySelect: (day: string) => void,
    
}

export interface ProgressPropsTypes {
    cards: Card[],
    currCardRef: any,
}

export interface FlashcardsPropsTypes {
    isAnimating: boolean,
    isFrontRef: any,
    currCardRef: any
    details: DeckType
}

export interface CardControllerPropsTypes {
    previousCard: () => void,
    nextCard: () => void,
    toggleSide: () => void,
    completeDeck: (deckID: string) => void,
    cards: Card[],
    currCardRef: any
}
export interface OverviewPropsTypes {
    jumpHandler: (idx: number) => void,
    overviewOpened: boolean,
    setOverviewOpened: React.Dispatch<React.SetStateAction<boolean>>,
    deck: Card[],
}

export interface PreviewPropsTypes {
    previewOpened: boolean,
    setPreviewOpened: React.Dispatch<React.SetStateAction<boolean>>,
    details: DeckType
}

export interface DynamicHeaderPropsTypes {
    headerName: string,
    displayBack?: boolean,
    content?: string
}

export interface MyDecksPropsTypes {
    details: DeckType,
    openDeleteModal?: (id?: string | undefined, title?: string | undefined) => void,
    openShareIDModal?: (id?: string | undefined) => void,
    openShareFriendModal?: (id?: string | undefined) => void,

}