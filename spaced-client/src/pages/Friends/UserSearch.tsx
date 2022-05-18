import { Paper } from "@mantine/core"
import React from 'react'
import { Send, UserCheck, UserCircle, UserPlus } from "tabler-icons-react"
import { DeckBtn } from "../../shared/components/Decks/DeckBtn"
import { useSocialAPI } from "../../shared/hooks/useSocial"
import { UserSocial } from "../../shared/types/social"
import { SearchComponent } from "./Styles"
function UserSearch({search, sent, isFriend, ...props}: {search: UserSocial, sent: boolean, isFriend: boolean}) {
  const variables = {
    to: search.username,
    type: 'REQUEST',
    isAccept: false
  }
  const {deploySocial} = useSocialAPI()
 
  return (
    <Paper p="md" withBorder shadow="sm" style={{margin: '.8em'}}>
      <SearchComponent {...props}>
           <UserCircle size={36}/>
            <span>{search.username}</span>
            {isFriend ? <UserCheck size={32} data-id="is-friend-icon"/> : sent ? <Send size={32} data-id="sent-icon"/> : <DeckBtn control={<UserPlus data-id="send-friend-btn" size={32}/>} onClick={() => deploySocial(variables)} />}
      </SearchComponent>
            
    </Paper>
  )
}

export default UserSearch