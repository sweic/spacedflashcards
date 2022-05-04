import { Tabs } from "@mantine/core"
import React, { useEffect } from 'react'
import '../../styles/friends.css'
import FriendSearch from "./FriendSearch"
import FriendList from "./FriendList"
import Activity from "./ActivityList"
import { io } from "socket.io-client";
import { useAppSelector } from "../../redux/store"

function Friends() {
  const user = useAppSelector(state => state.auth.user)
  
  return (
    <div className="friends-container">
      <Tabs grow style={{height: "100%", overflowY:"auto"}}>
        <Tabs.Tab label="Friends">
          <FriendList/>
        </Tabs.Tab>
        <Tabs.Tab label="Activity">
          <Activity/>
        </Tabs.Tab>
        <Tabs.Tab label="Search">
          <FriendSearch/>
        </Tabs.Tab>
      </Tabs>

    </div>
  )
}

export default Friends