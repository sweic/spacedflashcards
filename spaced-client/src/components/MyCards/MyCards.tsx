import React, {useEffect, useState} from 'react'
import { Loader, Text } from "@mantine/core"
import Deck from "./Deck"
import '../../styles/mycards.css'
import {useAppSelector } from "../../redux/store"
import {useAppModals} from '../../hooks/useAppModals'

function MyCards() {
  const {openDeleteModal, openShareModal, openShareFriendsModal} = useAppModals()
  const deckData = useAppSelector(state => state.dataStore)
  const user = useAppSelector(state => state.auth.user)
  
  return (
    <>
    {deckData ? 
    <div className="decks-container">
      {deckData.decks.map((deck) => {
        return (
          <Deck appProps={{details: deck, deleteHandler: openDeleteModal, user: user, shareModal: openShareModal, openShareFriendsModal}} />
        )
      })}
    </div> 
    :  <Loader/>}
    </>
  )
}

export default MyCards