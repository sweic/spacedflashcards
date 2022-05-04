import React from 'react'
import { ChevronRight, ChevronLeft, Refresh, Check } from "tabler-icons-react"
import { CardControllerPropsTypes } from "../../types/props"
import {Button} from '@mantine/core'
import { useParams } from "react-router-dom"


function CardController({appProps, closePreview}:{appProps: CardControllerPropsTypes, closePreview?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {id} = useParams()
    const {previousCard, nextCard, toggleSide, currCardRef, cards, completeDeck} = appProps
    const handler = () => {
      if (closePreview) closePreview(false)
      else completeDeck(id as string)
    }
  return (
    <>
    <div className="flashcard-controllers">
        <ChevronLeft className="controller-icon" size={36} onClick={() => previousCard()}/>
        <Refresh className="controller-icon"size={32} onClick={() => toggleSide()} />
       {currCardRef.current + 1 !== cards.length ? <ChevronRight className="controller-icon" size={36} onClick={() => nextCard()}/> : <Check onClick={() => handler()} className="controller-icon" size={36}/>}

    </div>
    <div>
    </div>
    </>
  )
}

export default CardController