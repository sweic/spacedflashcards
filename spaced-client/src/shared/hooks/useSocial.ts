import React, {useCallback, useEffect, useState} from 'react'
import { apiRequest } from "../../redux/reducers/api"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { UserActivity, UserActivityDeck, UserActivityType } from "../types/social"
export const useSocial = () => {
    
    const [sharedFriends, setSharedFriends] = useState<string[]>([])

    const sharedFriendHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const username = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    const social = useAppSelector(state => state.social)
    const decks = useAppSelector(state => state.dataStore.decks)
    const shareHelper = async (deckID: string, toShare: string[]) => {
        const targetDeck = decks.find((val) => {
            return val.id === deckID
        })
        if (!targetDeck) return 
        const newDeck: UserActivityDeck = {
            title: targetDeck.title,
            deckID: targetDeck.id
        }
        if (!targetDeck) return
        for (const friend of toShare) {
            const variables = {
                target: username,
                from: username,
                to: friend,
                type: "SHARE",
                deck: newDeck
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
        const body = {
            method: "POST",
            url: typeToUrl[type],
            type,
            data: data
        }
    
        const resultAction = await dispatch(apiRequest(body))
        if (apiRequest.fulfilled.match(resultAction)) {
            const newData = {
                ...data,
                when: new Date(Date.now())
            }
            
           social.socket.emit(type.toLowerCase(), newData)
        }
    }

    return {deploySocial, shareHelper}
    
}