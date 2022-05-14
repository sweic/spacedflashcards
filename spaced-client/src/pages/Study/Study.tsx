import React, {useState} from 'react'
import CardController from "./CardControllers"
import { FlashcardsContainer, StudyContainer } from "./Styles"
import Flashcards from './Flashcards';
import Progress from './Progress';
import { useStudy } from "../../shared/hooks/useStudy";
import { DeckType } from "../../shared/types/deck";


function StudyScreen({details, closePreview} : {details: DeckType, closePreview?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {currCardRef, nextCard,previousCard, toggleSide, isFrontRef, isAnimating, completeDeck} = useStudy(details)
  return (
    <StudyContainer>
        <FlashcardsContainer>
            <Progress appProps={{cards: details.cards, currCardRef}}/>
            <Flashcards appProps={{isAnimating, isFrontRef, currCardRef, details}}/>
            <CardController appProps={{nextCard, previousCard, toggleSide, cards: details.cards, currCardRef, completeDeck}} closePreview={closePreview}/>
        </FlashcardsContainer>
    </StudyContainer>
  )
}

export default StudyScreen

// 