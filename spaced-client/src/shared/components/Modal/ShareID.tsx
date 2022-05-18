import { Code, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, {useState} from 'react'
import {Clipboard} from 'tabler-icons-react'
import { DeckBtn } from "../Decks/DeckBtn";


function ShareID() {
    let params = new URLSearchParams(window.location.search)
    const deckID = params.get('id')
    const [currDeckID, undefined] = useState(deckID)
  return (
    <>
    {currDeckID && 
    <>
     <Text color={'black'}>
     Deck ID:
    </Text>
    <Code data-id="share-id" block style={{display: 'flex', justifyContent: "space-between"}} >{currDeckID}<DeckBtn control={<Clipboard/>} onClick={() => {navigator.clipboard.writeText(currDeckID); showNotification({title: 'Clipboard', message: "Deck ID has been copied to your clipboard!"})}}/></Code>
    </>
    }
    </>
    
  )
}

export default ShareID