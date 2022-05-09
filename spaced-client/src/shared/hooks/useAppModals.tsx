import { ContextModalProps, useModals } from '@mantine/modals';
import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {Text, Code, TextInput, Button, Divider, Checkbox} from '@mantine/core'
import { apiRequest } from "../../redux/reducers/api";
import { fetchDecks } from "../../redux/reducers/decks";
import {Clipboard, ExternalLink, UserCircle} from 'tabler-icons-react'
import {useState} from 'react'
import { showNotification } from "@mantine/notifications";
import { useSocial, useSocialAPI } from "./useSocial";
import { UserActivityDeck } from "../types/social";

export const useAppModals = () => {
    const modals = useModals()
    const dispatch = useAppDispatch()

    const openDeleteModal = useCallback((title: string, deckID: string, user: string) =>
    modals.openConfirmModal({
      title: 'Delete your card',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your card titled {title}? You will not be able to undo this action.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: "Cancel" },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: async () => {
        const body = {method: 'POST', url: 'deleteDeck', data: {deckID: deckID, username: user}, type: 'DELETE'}
        await dispatch(apiRequest(body))
        await dispatch(fetchDecks(true))
      },
    }), []);

    const openShareModal = (deckID: string) => {
      const id = modals.openModal({
        title: "Share your deck",
        centered: true,
        children: (
          <>
          <Text>
            Deck ID:
          </Text>
          <Code block style={{display: 'flex', justifyContent: "space-between"}} >{deckID}<Clipboard onClick={() => {navigator.clipboard.writeText(deckID); showNotification({title: 'Clipboard', message: "Deck ID has been copied to your clipboard!"})}} className="deck-btn-copy"/></Code>
          </>
        )
      })
    }

    const openImportModal = () => {
      const id = modals.openModal({
        title: "Import",
        centered: true,
        children: (
          <InputID closeModal={() => modals.closeModal(id)}/>
        )
      })
    }

    const openShareFriendsModal = (deck: UserActivityDeck) => {
      const id = modals.openModal({
        title: "Share to Friends",
        centered: true,
        children: (
          <ShareFriends deck={deck} closeModal={() => modals.closeModal(id)} />
        )
      })
    }

    

  return {openDeleteModal, openShareModal, openImportModal, openShareFriendsModal}
}


function ShareFriends({deck, closeModal}: {deck: UserActivityDeck, closeModal: any}) {
  const friends = useAppSelector(state => state.social.friends)
  const {sharedFriendHandler, sharedFriends} = useSocial()
  const {shareHelper} = useSocialAPI()
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
    <ul style={{height: '200px', overflowY: 'auto'}}>
      {friends.map((friend, idx) => {
        return <li key={idx} style={{display: 'flex', gap: '1em', justifyContent: 'space-between'}}>
          <div className="share-title" style={{display: 'flex', gap: '1em'}}>
            <UserCircle/> {friend}
          </div>
          <div className="share-btn-container">
            <Checkbox id={`${friends[idx]}`} checked={sharedFriends.includes(friend)} onChange={(e) => sharedFriendHandler(e)}/>
          </div>
        </li>
        
      })}
    </ul>
    <Button disabled={sharedFriends.length === 0} onClick={() => {shareHelper(deck, sharedFriends); closeModal()}}>Share</Button>
    </div>
  )
}

function InputID({closeModal}: any) {
  const api = useAppSelector(state => state.api)
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const [deckID, setDeckID] = useState('')
  const importHandler = async () => {
    const body = {method: 'POST', url: 'importDeck', data: {deckID: deckID, username: user}, type: 'IMPORT'}
    const resultAction = await dispatch(apiRequest(body))
    if (apiRequest.fulfilled.match(resultAction)) {
      closeModal()
      dispatch(fetchDecks(false))
    } else if (apiRequest.rejected.match(resultAction)) {
      showNotification({
        title: "Error!",
        message: "Deck does not exist",
        autoClose: 5000,
        color: 'red',
      })
    }
  }
  return (
      <>
        <TextInput placeholder="Deck ID"  required value={deckID} onChange={(e) => {setDeckID(e.currentTarget.value);}} />
        <Button style={{marginTop: '1em'}} onClick={() => importHandler()} loading={api.loading === 'pending'}>Import</Button>
      </>
  )
}


