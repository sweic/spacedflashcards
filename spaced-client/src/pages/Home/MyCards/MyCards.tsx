import React, {useEffect, useState} from 'react'
import { Loader } from "tabler-icons-react"
// import Deck from "../../../components/MyCards/Deck"
import Deck from '../../../shared/components/Decks/Deck'
import { useAppSelector } from "../../../redux/store"
import { MyCardsContainer } from "../../../shared/components/Decks/Styles"
import { useAppModals } from "../../../shared/hooks/useAppModals"

function MyCards() {
  const {openDeleteModal, openShareModal, openShareFriendsModal} = useAppModals()
  const deckData = useAppSelector(state => state.dataStore)
  const user = useAppSelector(state => state.auth.user)
  
  return (
    <>
    {deckData ? 
    <MyCardsContainer>
      {deckData.decks.map((deck) => {
        return (
          <Deck appProps={{details: deck, deleteHandler: openDeleteModal, user: user, shareModal: openShareModal, openShareFriendsModal}} />
        )
      })}
    </MyCardsContainer>
    :  <Loader/>}
    
    </>
  )
}

export default MyCards