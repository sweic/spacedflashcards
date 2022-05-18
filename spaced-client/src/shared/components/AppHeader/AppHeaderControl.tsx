import { ActionIcon, Divider, Menu } from "@mantine/core"
import React from 'react'
import { useNavigate } from "react-router-dom"
import {Plus, Settings, Logout } from "tabler-icons-react"
import { apiRequest } from "../../../redux/reducers/api"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { DeckBtnCircular } from "../Decks/DeckBtn"
import {createQueryModal} from '../../utils/queryModal'
import Modal from "../Modal/Modal"
import ImportID from "../Modal/ImportID"

function AppHeaderControl() {
    const importIDModal = createQueryModal('import')
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
        <Menu zIndex={1000} control ={<DeckBtnCircular control={<Plus data-id="create-btn"/>}></DeckBtnCircular>}>
            <Menu.Label>Create</Menu.Label>
            <Divider/>
            <Menu.Item data-id="import-id-btn" onClick={() => importIDModal.open()}>Import by deck ID</Menu.Item>
            <Menu.Item data-id="new-deck-btn" onClick={() => {navigate('/u/create', {state: {prevURL: "/u/home"}})} }>New Deck</Menu.Item>
        </Menu>
        <Menu control={<DeckBtnCircular control={<Settings data-id="settings-btn"/>}></DeckBtnCircular>}>
            <Menu.Label>
                {user}
            </Menu.Label>
            <Divider></Divider>
            <Menu.Item data-id="logout-btn" onClick={logout}icon={<Logout/>}>
                Logout
            </Menu.Item>
        </Menu>
        <Modal
            width={440}
            renderContent={<ImportID onClose={importIDModal.close}/>}
            withCloseButton={true}
            onClose={importIDModal.close}
            isOpen={importIDModal.isOpen()}
        />
        </>
  )
}

export default AppHeaderControl