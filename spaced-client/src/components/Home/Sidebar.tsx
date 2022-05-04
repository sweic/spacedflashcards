import React, {useState} from 'react'
import {UserPlus, Dashboard, Folders} from 'tabler-icons-react'

function Sidebar({sidebarExpanded, setSidebarExpanded, type, setter, mobile}: {type: string, setter: React.Dispatch<React.SetStateAction<string>>, mobile: boolean, sidebarExpanded: any, setSidebarExpanded: any}) {

    const toggle = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setSidebarExpanded(false)
        setter(e.currentTarget.id)
    }


  return (
    <div className={`sidebar-container mobile-sidebar-${sidebarExpanded ? "expanded" : ""}`}>
       
        <ul>
            <li className={`sidebar-menu-item ${type === 'dashboard' && 'selected'}`} id={'dashboard'} onClick={(e) => toggle(e)}>
                <Dashboard/>
                <p>Dashboard</p>
            </li>
            <li className={`sidebar-menu-item ${type === 'cards' && 'selected'}`} id={'cards'} onClick={(e) => toggle(e)}>
                <Folders/>
                <p>My Cards</p>
            </li>
            <li className={`sidebar-menu-item ${type === 'friends' && 'selected'}`}id={'friends'} onClick={(e) => toggle(e)}>
                <UserPlus/>
                <p>Friends</p>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar