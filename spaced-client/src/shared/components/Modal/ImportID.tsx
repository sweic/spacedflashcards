import { TextInput, Button } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import React, { useState } from 'react'
import { apiRequest } from "../../../redux/reducers/api"
import { fetchDecks } from "../../../redux/reducers/decks"
import { useAppSelector, useAppDispatch } from "../../../redux/store"
import { useOnFulfilled } from "../../hooks/useOnFulfilled"

function ImportID({onClose}: {onClose: () => void}) {
    const api = useAppSelector(state => state.api)
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    const [deckID, setDeckID] = useState('')
    const {isFulfilled} = useOnFulfilled()
    const importHandler = async () => {
        const body = {method: 'POST', url: 'importDeck', data: {deckID: deckID, username: user}, type: 'IMPORT'}
        isFulfilled(apiRequest, body, () => {
            onClose()
            dispatch(fetchDecks(false))
        }, () => {
            showNotification({
                title: "Error!",
                message: "Deck does not exist",
                autoClose: 5000,
                color: 'red',
              })
        })
    }
    return (
        <>
          <TextInput placeholder="Deck ID"  required value={deckID} onChange={(e) => {setDeckID(e.currentTarget.value);}} />
          <Button style={{marginTop: '1em'}} onClick={() => importHandler()} loading={api.loading === 'pending'}>Import</Button>
        </>
    )
}

export default ImportID