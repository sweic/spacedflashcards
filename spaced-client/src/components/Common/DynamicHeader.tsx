import React, { useState } from 'react'
import {Menu, Divider, ActionIcon, Modal} from '@mantine/core'
import { Plus, Logout, Settings, ArrowLeft } from 'tabler-icons-react';
import '../../styles/dashboard.css'
import {useNavigate, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import { apiRequest } from "../../redux/reducers/api";
import {DynamicHeaderPropsTypes} from '../../types/props'
import { useAppModals } from "../../hooks/useAppModals";


function DynamicHeader({appProps}: {appProps: DynamicHeaderPropsTypes}) {
    const [opened, setOpened] = useState(false)
    const {headerName, displayBack} = appProps
    const navigate = useNavigate()
    const location = useLocation() as any
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const {openImportModal} = useAppModals()

    const logout = async () => {
        const res = await dispatch(apiRequest({method: 'GET', url: 'logout', type: 'LOGOUT', data: null}))
        if (apiRequest.fulfilled.match(res)) {
            window.location.href = '/'
        }
    }

    const navigateHandler = () => {
        let nextContent = 'dashboard'
        if (location.state.before) {
            switch(location.state.before) {
                case 'dashboard':
                    break
                case 'cards':
                    nextContent = 'cards'
                    break
                case 'friends':
                    nextContent = 'friends'
                    break
            }
        }
        navigate('/u/home', {state: {content: nextContent}})
    }



  return (
      <div className="header-container">
        <div style={{display: 'flex', justifyContent:"start", gap: 16, alignItems: "center"}}>
            {location.state && displayBack && <ArrowLeft onClick={(e) => navigateHandler()} style={{cursor: "pointer"}} size={32} strokeWidth={3} color={'white'}/>}
            <h1>{headerName}</h1>
        </div>
        <div  className="dashboard-btn-container">
            {headerName !== "create" && 
            // <Plus className="create-btn" onClick={(e) => {navigate('/u/create', {state: {prevURL: "/u/home"}})}}size={32} strokeWidth={3} color={'#ffffff'}/>
            <Menu zIndex={1000} classNames={{root: "hi"}} control={<ActionIcon><Plus size={32} strokeWidth={3} color={"white"}/></ActionIcon>}>
                <Menu.Label>Create</Menu.Label>
                <Divider/>
                <Menu.Item onClick={() => openImportModal()}>Import by deck ID</Menu.Item>
                <Menu.Item onClick={() => {navigate('/u/create', {state: {prevURL: "/u/home"}})} }>New Deck</Menu.Item>
            </Menu>}
            <Menu classNames={{root: "hi"}} control={<ActionIcon><Settings color={"white"} size={32}/></ActionIcon>}>
                <Menu.Label>
                    {auth.user}
                </Menu.Label>
                <Divider></Divider>
                <Menu.Item onClick={logout}icon={<Logout/>}>
                    Logout
                </Menu.Item>
            </Menu>
        </div>
       
      </div>
  )
}

export default DynamicHeader