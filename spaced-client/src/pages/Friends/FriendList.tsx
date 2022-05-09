import React from 'react'
import { useAppSelector } from "../../redux/store"

function FriendList() {
  const friends = useAppSelector(state => state.social.friends)

  return (
    <div>
      {friends.map((friend) => {
        return (
          <p>{friend}</p>
        )
      })}
    </div>
  )
}

export default FriendList