import React from 'react'
import { useAppSelector } from "../../redux/store"
import Modal from "../../shared/components/Modal/Modal"
import { createQueryModal } from "../../shared/utils/queryModal"
import {CSSTransition} from 'react-transition-group';

function FriendList() {
  const friends = useAppSelector(state => state.social.friends)

  return (
    <div>
     {friends.map((friend) => {
       return <p>{friend}</p>
     })}
    </div>
  )
}

export default FriendList