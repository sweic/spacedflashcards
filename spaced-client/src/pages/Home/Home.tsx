import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Friends from "../Friends/Friends"
import MyCards from './MyCards/MyCards'
import { fetchDecks } from "../../redux/reducers/decks"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import AppHeader from "../../shared/components/AppHeader/AppHeader"
import { Rowbox } from "../../shared/components/Flexbox/Flexbox"
import { useSidebar } from "../../shared/hooks/useSidebar"
import { isSameDay } from "../../shared/utils/date-check"
import Sidebar from "./Sidebar/Sidebar"
import DashboardContent from '../../pages/Home/Dashboard/Dashboard'
import { MainContent } from "./Styles"


const renderMainContent = (contentType: string): JSX.Element => {
  switch (contentType) {
    case 'dashboard':
      return <DashboardContent/>
    case 'cards':
      return <MyCards/>
    case 'friends':
      return <Friends/>
    default:
      return <DashboardContent/>
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
    <AppHeader appProps={{headerName: "Home", content: content, displayBack: false}}/>
    <Rowbox style={{height: 'calc(100vh - 4em)'}}>
      <Sidebar setSidebarExpanded={setSidebarExpanded} sidebarExpanded={sidebarExpanded} type={content} setter={setContent}></Sidebar>
      <MainContent>{renderMainContent(content)}</MainContent>
    </Rowbox>
   
    </>
  )
}

export default Home