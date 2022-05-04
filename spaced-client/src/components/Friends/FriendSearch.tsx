import { Loader, Paper, TextInput } from "@mantine/core"
import React from 'react'
import { Search, UserCircle, UserPlus } from "tabler-icons-react"
import { useSearch } from "../../hooks/useSearch"
import { useSocial } from "../../hooks/useSocial"
import { useAppSelector } from "../../redux/store"
import UserSearch from "./UserSearch"

function FriendSearch() {

  const {searchInput, currentSearchHistory, searchHistoryHandler, queriedSearchHistory, loading} = useSearch()
  const user = useAppSelector(state => state.auth.user)
  const social = useAppSelector(state => state.social)
  return (
    <div className="friends-content-container">
      <div className="friends-search">
        <TextInput size="md" icon={<Search size={18}/>} placeholder="Search" value={searchInput} onChange={(event) => searchHistoryHandler(event)}/>
      </div>
      <Paper withBorder shadow="md" className="search-results" style={{backgroundColor: "#f4f5f7"}}>
        {currentSearchHistory.map((search) => {
          if (search.username === user) return
          return (
          <UserSearch search={search} sent={social.sentFriendRequest.includes(search.username)} isFriend={social.friends.includes(search.username)}/>)
        })}
        {loading && <Loader/>}
        {queriedSearchHistory.map((search) => {
          if (search.username === user) return
          return (<UserSearch search={search}  sent={social.sentFriendRequest.includes(search.username)} isFriend={social.friends.includes(search.username)}/>)
        })}
      </Paper>
    </div>
  )
}

export default FriendSearch