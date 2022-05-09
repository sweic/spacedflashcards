import { ActionIcon, Divider, Menu } from "@mantine/core"
import React from 'react'
import { useNavigate } from "react-router-dom"
import {Plus, Settings, Logout } from "tabler-icons-react"
import { apiRequest } from "../../../redux/reducers/api"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { useAppModals } from "../../hooks/useAppModals"
import { DeckBtnCircular } from "../Decks/DeckBtn"

function AppHeaderControl() {
    const {openImportModal} = useAppModals()
    const navigate =  useNavigate()
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    const logout = async () => {
        const res = await dispatch(apiRequest({method: 'GET', url: 'logout', type: 'LOGOUT', data: null}))
        if (apiRequest.fulfilled.match(res)) {
            window.location.href = '/'
        }
    }
    return (
        <>
        <Menu zIndex={1000} classNames={{root: "hi"}} control ={<DeckBtnCircular control={<Plus/>}></DeckBtnCircular>}>
            <Menu.Label>Create</Menu.Label>
            <Divider/>
            <Menu.Item onClick={() => openImportModal()}>Import by deck ID</Menu.Item>
            <Menu.Item onClick={() => {navigate('/u/create', {state: {prevURL: "/u/home"}})} }>New Deck</Menu.Item>
        </Menu>
        <Menu classNames={{root: "hi"}} control={<DeckBtnCircular control={<Settings/>}></DeckBtnCircular>}>
            <Menu.Label>
                {user}
            </Menu.Label>
            <Divider></Divider>
            <Menu.Item onClick={logout}icon={<Logout/>}>
                Logout
            </Menu.Item>
        </Menu>
        </>
  )
}

export default AppHeaderControl