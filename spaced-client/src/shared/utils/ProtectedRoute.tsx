import React, {useEffect, useState} from 'react'
import {useNavigate, Route} from 'react-router-dom'
import { Loader } from "@mantine/core"
import {useAppDispatch, useAppSelector} from '../../redux/store'
import { fetchUser } from "../../redux/reducers/auth"
import { Columnbox } from "../components/Flexbox/Flexbox"


function ProtectedRoute({children} : {children: JSX.Element}) {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
      if (!auth.user) {
        dispatch(fetchUser(navigate))
      }
    }, [dispatch])
    
  return (
    <>
        {auth.loading !== 'success' ? <Loader/> : children}
        </>
    
  )
}

export default ProtectedRoute