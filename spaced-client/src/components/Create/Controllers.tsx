import React, {forwardRef, useRef, useState} from 'react'
import {ChevronLeft, ChevronRight, Plus, Trash} from 'tabler-icons-react'
import {ControllerPropTypes} from '../../types/props'


function Controllers({appProps}: {appProps: ControllerPropTypes}) {
  const {deleteCard, previousCard, curr, deck, addCard, nextCard} = appProps

 
  return (
    <div className="create-btn-controller-container">
      
      <Trash className="controller-icon" size={24} onClick={(e) => deleteCard()} style={{cursor: 'pointer'}}/>
      <ChevronLeft className="controller-icon" size={36} strokeWidth={3} style={{cursor: 'pointer'}}onClick={(e) => previousCard()}/>
      <p>{curr + 1} / {deck.length}</p>
      <ChevronRight className="controller-icon" size={36} strokeWidth={3} style={{cursor: 'pointer'}} onClick={(e) => nextCard()}/>
      <Plus className="controller-icon" size={36} onClick={(e) => addCard()} style={{cursor: 'pointer'}}/>
      
    </div>
  )
}

export default React.memo(Controllers)