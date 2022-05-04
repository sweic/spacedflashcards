import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import {DeckType} from '../../types/deck'
import {fetchCardByID} from '../../api/api-fetch'
import DynamicHeader from "../Common/DynamicHeader"
import StudyScreen from "./StudyScreen"
import {useAppDispatch, useAppSelector} from '../../redux/store'
import '../../styles/study.css'
import { fetchDecks } from "../../redux/reducers/decks"

function StudyWrapper() {
  const location = useLocation() as any
  const navigate = useNavigate()
  const {id} = useParams()
  const [deck, setDeck] = useState<DeckType>()
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const asyncHandler = async (signal: AbortSignal) => {
      if (location.state && location.state.deck) {
        setDeck(location.state.deck) 
      } else {
        dispatch(fetchDecks(false))
        fetchCardByID(auth.user, signal, id as string).then((res) => {
          setDeck(res.data)
        }).catch((err) => {
          navigate('/u/home')
        })
        
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
    {deck && <><DynamicHeader appProps={{headerName: "Study", displayBack: true}}/>
    <div className="study-container-box"><StudyScreen details={deck}/></div></>}
    </>
  )
}

export default StudyWrapper