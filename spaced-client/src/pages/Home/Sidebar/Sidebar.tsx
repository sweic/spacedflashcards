import React from 'react'
import { Dashboard, Folders, UserPlus } from "tabler-icons-react"
import {SidebarButton, SidebarContainer, SidebarItem, SidebarList} from './Styles'

function Sidebar({setSidebarExpanded, sidebarExpanded, type, setter}: any) {
    const toggle = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setSidebarExpanded(false)
        setter(e.currentTarget.id)
    }
  return (
    <>
    <SidebarButton color="white" onClick={() => setSidebarExpanded(!sidebarExpanded)}/>
    <SidebarContainer sidebarExpanded={sidebarExpanded}>
        <SidebarList>
            {sidebarItems.map((item, idx) => {
                return <SidebarItem id={item.name} key={idx} selected={type === item.name} onClick={(e) => toggle(e)}>
                    {item.component}
                    <p>{item.text}</p>
                </SidebarItem>
            })}
        </SidebarList>
    </SidebarContainer>
    </>
  )
}

export default Sidebar

const sidebarItems = [
    {
        name: 'dashboard',
        component: <Dashboard/>,
        text: 'Dashboard'
    },
    {
        name: 'cards',
        component: <Folders/>,
        text: 'My Cards'
    },
    {   
        name: 'friends',
        component: <UserPlus/>,
        text: 'Friends'
    },
]