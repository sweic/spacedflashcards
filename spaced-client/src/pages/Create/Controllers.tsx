import React, {forwardRef, useRef, useState} from 'react'
import { Trash, ChevronLeft, ChevronRight, Plus } from "tabler-icons-react"
import { DeckBtnCircular } from "../../shared/components/Decks/DeckBtn"
import { ControllerPropTypes } from "../../shared/types/props"
import { CreateBtnBox } from "./Styles"



function Controllers({appProps}: {appProps: ControllerPropTypes}) {
  const {deleteCard, previousCard, curr, deck, addCard, nextCard} = appProps

 
  return (
    <CreateBtnBox>
        <DeckBtnCircular control={<Trash size={24}/>} onClick={(e) => deleteCard()}/>
        <DeckBtnCircular control={<ChevronLeft size={36} strokeWidth={3}/>} onClick={(e) => previousCard()}/>
        <p>{curr + 1} / {deck.length}</p>
        <DeckBtnCircular control={<ChevronRight size={36} strokeWidth={3}/>}  onClick={(e) => nextCard()}/>
        <DeckBtnCircular control={<Plus size={36}/>} onClick={(e) => addCard()}/>
    </CreateBtnBox>
  )
}

export default React.memo(Controllers)