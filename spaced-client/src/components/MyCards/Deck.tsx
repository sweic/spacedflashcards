import React from 'react'
import {DeckType} from '../../types/deck'
import {useNavigate} from 'react-router-dom'
import {Edit, Trash, Share} from 'tabler-icons-react'
import { MyDecksPropsTypes } from "../../types/props"
import { Menu, Paper } from "@mantine/core"



function Deck({appProps}: {appProps: MyDecksPropsTypes}) {
  const {details, deleteHandler, user, shareModal, openShareFriendsModal} = appProps
  const navigate = useNavigate()
  const redirectHandle = () => {
    navigate(`/u/study/${details.id}`, {state: {deck: details, before: deleteHandler ? 'cards' : 'dashboard'}})
  }
  return (
    
    <div className="deck" onClick={() => redirectHandle()}>
      <Paper withBorder shadow="md" className="deck">
    <a>
      <div className="deck-info-container" style={{textAlign: "center", paddingTop: "1em"}}>
        <h1>{details.title} </h1>
        <span>{details.cards.length} {details.cards.length === 1 ? 'CARD' : 'CARDS'}</span>
        <span>{details.desc}</span>
      </div>
        <div className="deck-btn-controllers">
          <Edit className="deck-btn-edit" onClick={(e) => {e.stopPropagation(); navigate(`/u/edit/${details.id}`, {state: {deck: details}})}} />
          <Menu style={{paddingBottom: "10px"}} control={<div><Share size={24} className="deck-btn-edit"/></div>} onClick={(e: any) => {e.stopPropagation()}}>
            <Menu.Label>Share </Menu.Label>
            <Menu.Item onClick={(e: any) => {e.stopPropagation(); shareModal(details.id)}}> Via Deck ID</Menu.Item>
            <Menu.Item onClick={(e: any) => {e.stopPropagation(); openShareFriendsModal({title: details.title, deckID: details.id})}}>To Friends</Menu.Item>

          </Menu>
          <Trash className="deck-btn-delete" onClick={(e) => {e.stopPropagation(); deleteHandler!(details.title, details.id, user!)} }/>

        </div>
    </a>
    </Paper>
    </div>
    
  )
}

export default Deck