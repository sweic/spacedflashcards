import { Menu, Paper } from "@mantine/core"
import React from 'react'
import { useNavigate } from "react-router-dom"
import { Edit, Share, Trash } from "tabler-icons-react"
import { MyDecksPropsTypes } from "../../types/props"
import { DeckBtn, DeckBtnDangerous } from "./DeckBtn"
import { DeckBtns, DeckContainer, DeckInfo } from "./Styles"


function Deck({appProps}: {appProps: MyDecksPropsTypes}) {
  const {details, deleteHandler, user, shareModal, openShareFriendsModal} = appProps
  const navigate = useNavigate()
  const redirectHandle = () => {
    navigate(`/u/study/${details.id}`, {state: {deck: details, before: deleteHandler ? 'cards' : 'dashboard'}})
  }
  return (
      <Paper withBorder shadow="md" style={{width: '400px'}}>
    <DeckContainer onClick={() => redirectHandle()}>
            
        <DeckInfo>
            <h1 style={{color: 'black'}}>{details.title}</h1>
            <span>{details.cards.length} {details.cards.length === 1 ? 'CARD' : 'CARDS'}</span>
            <span>{details.desc}</span>
        </DeckInfo>
        <DeckBtns>
            <DeckBtn control={<Edit/>} onClick={(e) => {e.stopPropagation(); navigate(`/u/edit/${details.id}`, {state: {deck: details}})}}/>
            <Menu control={<DeckBtn onClick={(e: any) => {e.stopPropagation()}} control={<Share/>}/>} >
                <Menu.Label>Share </Menu.Label>
                <Menu.Item onClick={(e: any) => {e.stopPropagation(); shareModal(details.id)}}> Via Deck ID</Menu.Item>
                <Menu.Item onClick={(e: any) => {e.stopPropagation(); openShareFriendsModal({title: details.title, deckID: details.id})}}>To Friends</Menu.Item>
            </Menu>
            <DeckBtnDangerous control={<Trash/>} onClick={(e) => {e.stopPropagation(); deleteHandler!(details.title, details.id, user!)} }/>
        </DeckBtns>
    </DeckContainer>
    </Paper>
    
  )
}

export default Deck