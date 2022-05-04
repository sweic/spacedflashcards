import React from 'react'
import {DeckType} from '../../types/deck'
import {useNavigate} from 'react-router-dom'
import {Edit} from 'tabler-icons-react'
import { DeckCompletionType, TodoDeckType } from "../../types/dashboard"
import { Paper } from "@mantine/core"

function TodoDeck({details, completion}: {details: TodoDeckType, completion?: string}) {
  const navigate = useNavigate()
  const redirectHandle = () => {
    navigate(`/u/study/${details.id}`, {state: {deck: details, before: 'dashboard'}})
  }
  return (
    <div className="deck" onClick={() => redirectHandle()}>
    <a>
      <div className="deck-info-container" style={{textAlign: "center", paddingTop: "1em"}}>
        <h1>{details.title} </h1>
        <span>{details.cards.length} {details.cards.length === 1 ? 'CARD' : 'CARDS'}</span>
        <span>{details.desc}</span>
      </div>
        <div className="deck-btn-controllers">
          <Edit className="deck-btn-edit" onClick={(e) => {e.stopPropagation(); navigate(`/u/edit/${details.id}`, {state: {deck: details}})}} />
          <h3>{completion}</h3>
        </div>
    </a>
    </div>
  )
}

export default TodoDeck