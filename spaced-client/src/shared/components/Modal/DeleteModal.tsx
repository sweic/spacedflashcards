import React, { useState } from 'react'
import {Button, Text} from '@mantine/core'
import { DeleteModalBtns } from "./Styles"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { apiRequest } from "../../../redux/reducers/api"
import { fetchDecks } from "../../../redux/reducers/decks"
import { useSearchParams } from "react-router-dom"
interface DeleteModalProps {
    title: string,
    deckID: string,
    user: string,
    onClose: () => void
}
function DeleteModal({onClose}: {onClose: () => void}) {
  let params = new URLSearchParams(window.location.search)
    const deckID = params.get('id')
    const title = params.get('title')
    const [currDeckID, undefined] = useState(deckID)
    const [currTitle, undefinedX] = useState(title)
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    
    const handleDelete = async () => {
        const body = {method: 'POST', url: 'deleteDeck', data: {deckID: currDeckID, username: user}, type: 'DELETE'}
        await dispatch(apiRequest(body))
        await dispatch(fetchDecks(true))
        onClose()
    }

  return (
      <>
      {currTitle && <>
      <Text color="black" size="sm">
      Are you sure you want to delete your card titled {currTitle}? You will not be able to undo this action.
      </Text>
      <DeleteModalBtns>
        <Button color="white" onClick={() => onClose()}>Cancel</Button>
        <Button color="red" onClick={() => handleDelete()}>Delete</Button>
      </DeleteModalBtns>
      </>
      }
      </>
    
  )
}

export default DeleteModal