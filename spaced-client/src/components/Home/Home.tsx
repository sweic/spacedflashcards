import React, {useEffect, useState} from 'react'
import { Dashboard, Menu2 } from "tabler-icons-react"
import DynamicHeader from "../Common/DynamicHeader"
import Sidebar from "./Sidebar"
import { useSidebar } from "../../hooks/useSidebar"
import DashboardContent from '../Dashboard/Dashboard'
import MyCards from "../MyCards/MyCards"
import '../../styles/home.css'
import Friends from "../Friends/Friends"
import {useAppDispatch, useAppSelector} from '../../redux/store'
import { fetchDecks } from "../../redux/reducers/decks"
import { isSameDay } from "../../utils/date-check"
import { useLocation } from "react-router-dom"
import useNotifications from "../../hooks/useSocket"

const renderMainContent = (contentType: string): JSX.Element => {
  switch (contentType) {
    case 'dashboard':
      return <DashboardContent/>
    case 'cards':
      return <MyCards/>
    case 'friends':
      return <Friends/>
    default:
      return <MyCards/>
  }
}
function Home() {
  const {content, setContent} = useSidebar()
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const lastUpdated = useAppSelector(state => state.dataStore.lastUpdated)
  const location = useLocation() as any


  useEffect(() => {
    if (location.state && location.state.content) {
      switch(location.state.content) {
        case 'cards':
          setContent('cards')
          break
        case 'dashboard':
          setContent('dashboard')
          break
        case 'friends':
          setContent('friends')
          break
        default:
          setContent('dashboard')
      }

    }
  }, [location])

  useEffect(() => {
      if (user && !isSameDay(lastUpdated)) dispatch(fetchDecks(false))
  }, [user])

  return (
    <>
    <div><DynamicHeader appProps={{headerName: "Home", content: content, displayBack: false}}/><Menu2 color="white" onClick={() => setSidebarExpanded(!sidebarExpanded)}className="sidebar-burger"/></div>
    <div className="main-content">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} mobile={true} type={content} setter={setContent}/>
     <div className="main-content-container">{renderMainContent(content)}</div>
    </div>
    </>
  )
}

export default Home