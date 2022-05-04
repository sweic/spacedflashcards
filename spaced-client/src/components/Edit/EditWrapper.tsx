import React, {useEffect, useState} from 'react'
import Create from '../Create/Create'
import {useLocation, useParams, useNavigate} from 'react-router-dom'
import { fetchCardByID } from "../../api/api-fetch"
import { useAppSelector } from "../../redux/store"

function EditWrapper() {
    const [details, setDetails] = useState()
    const user = useAppSelector(state => state.auth.user)
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation() as any
    
    useEffect(() => {
        const aborter = new AbortController()
        const signal = aborter.signal
       if (location.state && location.state.deck) {
        setDetails(location.state.deck)
       } else {
           fetchCardByID(user, signal, id!).then((res) => {
               setDetails(res.data)
           }).catch((err) => {
               navigate('/u/home')
           })
       }
       return () => aborter.abort()
    }, [])
  return (
      <>
      {details && <Create details={details}></Create>}
      </>
  )
}

export default EditWrapper