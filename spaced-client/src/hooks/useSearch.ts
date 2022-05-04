import React, {useCallback, useEffect, useState} from 'react'
import { apiRequest } from "../redux/reducers/api"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { UserSocial, UserActivity, UserActivityDeck } from "../types/social"

export const useSearch = () => {
    const dispatch = useAppDispatch()
    const social = useAppSelector(state => state.social)
    const username = useAppSelector(state => state.auth.user)
    const [searchInput, setSearchInput] = useState('')
    const [timerID, setTimerID] = useState<any>()
    const [namelist, setNamelist] = useState<string[]>([])
    const [currentSearchHistory, setCurrentSearchHistory] = useState<UserSocial[]>(social.searchHistory)
    const [queriedSearchHistory, setQueriedSearchHistory] = useState<UserSocial[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const searchHistoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value)
        const newFiltered = filterSearchHistory(social.searchHistory, e.currentTarget.value)
        setCurrentSearchHistory(newFiltered)
        const newNamelist = createNameList(newFiltered)
        setNamelist(newNamelist)
    }

    useEffect(() => {
        if (!searchInput) {
            setQueriedSearchHistory([])
            return
        }    
        clearTimeout(timerID)
        const id = setTimeout(async () => {
            setLoading(true)
            const res = await query()
            const final = filterQueriedHistory(res.payload)
            setQueriedSearchHistory(final)
            setLoading(false)
            
        }, 500)
        setTimerID(id)
        
        return () => clearTimeout(timerID)
    }, [searchInput])

    const query = async () => {

        const body = {url: "querySearchHistory", method: "POST", data: {keywords: searchInput}, type: "QUERY"}
        return await dispatch(apiRequest(body))
    }

    const filterQueriedHistory = (queried: UserSocial[]) => {
        return queried.filter((user) => {
            return (!namelist.includes(user.username) && user.username !== username)
        })
        
    }

    return {searchInput, setSearchInput, currentSearchHistory, searchHistoryHandler, queriedSearchHistory, loading}
}

const filterSearchHistory = (original: UserSocial[], predicate: string) => {
    return original.filter((social) => {
        return social.username.startsWith(predicate)
    })
}

const createNameList = (original: UserSocial[]) => {
    return original.map((search) => {
        return search.username.replace(/\n/g, '')
    })
}
