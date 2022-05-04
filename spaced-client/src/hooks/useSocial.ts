import React, {useCallback, useEffect, useState} from 'react'
import { apiRequest } from "../redux/reducers/api"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { UserActivity, UserActivityDeck, UserActivityType } from "../types/social"
export const useSocial = () => {
    console.log('test')
    
    const [sharedFriends, setSharedFriends] = useState<string[]>([])

    const sharedFriendHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.id)
        const friend = e.currentTarget.id
        const idxOf = sharedFriends.indexOf(friend)
        if (idxOf === -1) { 
          setSharedFriends([...sharedFriends, friend])
          return
        } 
        const idx = sharedFriends.indexOf(friend)
        const newFriends = [...sharedFriends]
        newFriends.splice(idx, 1)
        setSharedFriends(newFriends)
        return
    
      }
    return {sharedFriends, sharedFriendHandler} 
}

interface UseSocialAPIInputParameters {
    target?: string
    from?: string,
    to?: string,
    type: string,
    activityIdx?: number,
    toShare?: string[],
    deck?: UserActivityDeck


}

const typeToUrl: {[key: string]: string} = {
    REQUEST: 'sendFriendRequest',
    SHARE: 'createNotification',
    DELETE: 'deleteActivity',
     ACCEPT: 'acceptFriendRequest',
    IMPORT: 'importSharedDeck'
}

export const useSocialAPI = () => {
    const social = useAppSelector(state => state.social)
    const username = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()

    const shareHelper = async (deck: UserActivityDeck, toShare: string[]) => {
        for (const friend of toShare) {
            const variables = {
                target: username,
                from: username,
                to: friend,
                type: "SHARE",
                deck: deck
            }
            await deploySocial(variables)
        }
    }

    const deploySocial = async (variables: UseSocialAPIInputParameters) => {
        const {from, to, type, activityIdx, deck, target} = variables
        const activity = social.activityHistory[activityIdx!]
        var newActivityHistory;
        if (activityIdx !== null) {
            newActivityHistory = [...social.activityHistory]
            newActivityHistory.splice(activityIdx!, 1)
        } 
        const data = {
            target: target || username,
            from: from || username,
            to: to || username,
            type,
            newActivityHistory,
            deck: activity?.deck || deck
        }
        console.log(data)
        const body = {
            method: "POST",
            url: typeToUrl[type],
            type: "IDK",
            data: data
        }
        console.log(body)
    
        const resultAction = await dispatch(apiRequest(body))
        if (apiRequest.fulfilled.match(resultAction)) {
            const newData = {
                ...data,
                when: new Date(Date.now())
            }
            console.log(newData)
           social.socket.emit(type.toLowerCase(), newData)
        }
    }

    return {deploySocial, shareHelper}
    
}