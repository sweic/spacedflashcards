import React, {useState, useRef, useEffect} from 'react'
import { DeckType } from "../types/deck"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Navigate } from "react-router-dom"
import { incrementCount } from "../../redux/reducers/decks"
import { store } from "../../redux/store"
import history from '../../router/RouterHistory'
import { apiRequest } from "../../redux/reducers/api"
const useStateRef = (defaultValue: any) => {

    const [value, _setValue] = useState(defaultValue)
    const valueRef = useRef(value)
    const setValue = (toSet: any) => {
        valueRef.current = toSet
        _setValue(toSet)
    }

    return [value, valueRef, setValue]
}


export const useStudy = (details: DeckType) => {
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    const handleKeyPress = (e: KeyboardEvent) => {

        switch (e.keyCode) {
            case 39:
                nextCard()
                return;
            case 37:
                previousCard()
                return;
            case 32:
                toggleSide()
                return;
            default:
                return;
        }
    }

    const preventScroll = (e: KeyboardEvent) => {
        if (e.keyCode === 32) {
            e.preventDefault()
        }
    }
    
    const [_currCard, currCardRef, setCurrCard] = useStateRef(0)
    const [_isFront, isFrontRef, setIsFront] = useStateRef(true)
    const [isAnimating, setIsAnimating] = useState(false)

    const animateCard = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setIsAnimating(false)
        }, 20)
    }

    const nextCard = () => {
        if (currCardRef.current + 1 >= details.cards.length) return
        setIsFront(true)
        setCurrCard(currCardRef.current + 1)
    }

    const previousCard = () => {
        if (currCardRef.current === 0) return
        setIsFront(true)
        setCurrCard(currCardRef.current - 1)
    }

    const toggleSide = () => {
        animateCard()
        setIsFront(!isFrontRef.current)
    }

    const completeDeck = async (deckID: string) => {
        
        if (deckID) {
            const body = {method: "POST", url: "updateCount", data: {user: user, deckID: deckID}, type: "UPDATER"}
            const decks = store.getState().dataStore.dashboardData.decks
            const target = decks.find((deck) => deck.id === deckID)
            if (target!.completion !== target!.count) {
                store.dispatch(incrementCount(deckID))
                await store.dispatch(apiRequest(body))
            }

            
        }
        history.replace('/u/home')
        
    }

    useEffect(() => {

        window.addEventListener('keyup', handleKeyPress)
        window.addEventListener('keydown', preventScroll)

        return () => {
            window.removeEventListener('keyup', handleKeyPress)
            window.removeEventListener('keydown', preventScroll)

        }

    },[])

    return {currCardRef, setCurrCard, nextCard, previousCard, toggleSide, isFrontRef, isAnimating, completeDeck}
}