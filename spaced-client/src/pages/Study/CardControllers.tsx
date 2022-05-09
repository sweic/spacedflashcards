import React from 'react'
import { useParams } from "react-router-dom"
import { ChevronLeft, Refresh, ChevronRight, Check } from "tabler-icons-react"
import { DeckBtnCircular } from "../../shared/components/Decks/DeckBtn"
import { CardControllerPropsTypes } from "../../shared/types/props"
import {FlashcardController} from './Styles'



function CardController({appProps, closePreview}:{appProps: CardControllerPropsTypes, closePreview?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {id} = useParams()
    const {previousCard, nextCard, toggleSide, currCardRef, cards, completeDeck} = appProps
    const handler = () => {
      if (closePreview) closePreview(false)
      else completeDeck(id as string)
    }
  return (
    <>
    <FlashcardController>
        <DeckBtnCircular control={<ChevronLeft size={36} />} onClick={() => previousCard()}></DeckBtnCircular>
        <DeckBtnCircular  control={<Refresh size={36}/>} onClick={() => toggleSide()}></DeckBtnCircular>
        {currCardRef.current + 1 !== cards.length ? <DeckBtnCircular  control={<ChevronRight size={36}/>} onClick={() => nextCard()}></DeckBtnCircular> : <DeckBtnCircular  control={<Check size={36}/>} onClick={() => handler()}></DeckBtnCircular>}
    </FlashcardController>
    </>
  )
}

export default React.memo(CardController)