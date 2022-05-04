import React, {useState} from 'react'
import { DeckType } from "../../types/deck"
import {useStudy} from '../../hooks/useStudy'
import Progress from './Progress'
import Flashcards from "./Flashcards"
import CardController from "./CardController"


function StudyScreen({details, closePreview} : {details: DeckType, closePreview?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {currCardRef, nextCard,previousCard, toggleSide, isFrontRef, isAnimating, completeDeck} = useStudy(details)

  return (
    <div className="study-container">
        <div className="flashcards-container">
          <Progress appProps={{cards: details.cards, currCardRef}}/>
          <Flashcards appProps={{isAnimating, isFrontRef, currCardRef, details}}/>
          <CardController appProps={{nextCard, previousCard, toggleSide, cards: details.cards, currCardRef, completeDeck}} closePreview={closePreview}/>
        </div>
    </div>
  )
}

export default StudyScreen

// 