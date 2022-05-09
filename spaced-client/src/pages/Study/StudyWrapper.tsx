import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import {DeckType} from '../../shared/types/deck'
import AppHeader from "../../shared/components/AppHeader/AppHeader"
import StudyScreen from './Study'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import { fetchDecks } from "../../redux/reducers/decks"
import { Loader } from "@mantine/core"
import { apiRequest } from "../../redux/reducers/api"
import { useOnFulfilled } from "../../shared/hooks/useOnFulfilled"

function StudyWrapper() {
  const location = useLocation() as any
  const navigate = useNavigate()
  const {id} = useParams()
  const [deck, setDeck] = useState<DeckType>()
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const {isFulfilled} = useOnFulfilled()

  const asyncHandler = async (signal: AbortSignal) => {
      if (location.state && location.state.deck) {
        setDeck(location.state.deck) 
      } else {
        dispatch(fetchDecks(false))
        const body = {
          url: 'fetchCardByID',
          method: 'POST',
          data: {user: auth.user, id: id},
          type: 'CARD'
      }
      isFulfilled(apiRequest, body, (data: any) => {
          setDeck(data)
      }, () => navigate('/u/home'))
        
      } 
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    asyncHandler(signal)
    return () => controller.abort()
    
  }, [auth.user])
  


  return (
    <>
    {deck ? 
    <>
    <AppHeader appProps={{headerName: "Study", displayBack: true}}/>
    <StudyScreen details={deck}/>
    </> : <Loader/>}
    </>
  )
}

export default StudyWrapper