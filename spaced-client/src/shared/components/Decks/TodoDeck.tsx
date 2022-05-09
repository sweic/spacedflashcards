import React from 'react'
import { useNavigate } from "react-router-dom"
import { Edit } from "tabler-icons-react"
import { TodoDeckType } from "../../types/dashboard"
import {DeckContainer, DeckInfo, DeckBtns} from './Styles'
import {DeckBtn} from './DeckBtn'
import { Paper } from "@mantine/core"

function TodoDeck({details, completion}: {details: TodoDeckType, completion?: string}) {
  const navigate = useNavigate()
  const redirectHandle = () => {
    navigate(`/u/study/${details.id}`, {state: {deck: details, before: 'dashboard'}})
  }
  return (
    <Paper withBorder shadow="md">
    <DeckContainer onClick={() => redirectHandle()}>
        <DeckInfo>
            <h1 style={{color: 'black'}}>{details.title}</h1>
            <span>{details.cards.length} {details.cards.length === 1 ? 'CARD' : 'CARDS'}</span>
            <span>{details.desc}</span>
        </DeckInfo>
        <DeckBtns>
            <DeckBtn control={<Edit/>} onClick={(e) => {e.stopPropagation(); navigate(`/u/edit/${details.id}`, {state: {deck: details}})}} />
            <h3>{completion}</h3>
        </DeckBtns>
    </DeckContainer>
    </Paper>
  )
}

export default TodoDeck