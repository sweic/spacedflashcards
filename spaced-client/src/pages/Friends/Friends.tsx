import { Tabs } from "@mantine/core"
import React, { useEffect } from 'react'
import { useAppSelector } from "../../redux/store"
import ActivityList from "./ActivityList"
import FriendList from "./FriendList"
import FriendSearch from "./FriendSearch"


function Friends() {
  const user = useAppSelector(state => state.auth.user)
  
  return (
      <Tabs grow style={{height: "calc(100vh-4em)", overflowY:"hidden"}}>
        <Tabs.Tab label="Friends">
          <FriendList/>
        </Tabs.Tab>
        <Tabs.Tab label="Activity">
          <ActivityList/>
        </Tabs.Tab>
        <Tabs.Tab label="Search">
          <FriendSearch/>
        </Tabs.Tab>
      </Tabs>

  )
}

export default Friends