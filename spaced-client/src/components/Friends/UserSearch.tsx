import { Paper } from "@mantine/core"
import React from 'react'
import { Send, UserCheck, UserCircle, UserPlus } from "tabler-icons-react"
import { useSocialAPI } from "../../hooks/useSocial"
import { UserSocial } from "../../types/social"

function UserSearch({search, sent, isFriend}: {search: UserSocial, sent: boolean, isFriend: boolean}) {
  const variables = {
    to: search.username,
    type: 'REQUEST',
    isAccept: false
  }
  const {deploySocial} = useSocialAPI()
 
  return (
    <Paper p="md" withBorder shadow="sm" className="search-component">
            <UserCircle size={36}/>
            <span>{search.username}</span>
            {isFriend ? <UserCheck size={32}/> : sent ? <Send size={32}/> : <UserPlus style={{cursor: 'pointer'}} size={32} className="deck-btn-edit" onClick={() => deploySocial(variables) }/>}
          </Paper>
  )
}

export default UserSearch