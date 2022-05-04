import React, {useContext, createContext, useState} from 'react'
import {DeckType} from "../types/deck"
import {DashboardType} from "../types/dashboard"
import {EMPTY_DASHBOARD} from "../constants/index"



interface DataContextType {
    deckData: DeckType[],
    setDeckData: React.Dispatch<React.SetStateAction<DeckType[]>>,
    dashboardData: DashboardType,
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardType>>,
    fetched: Boolean,
    setFetched: React.Dispatch<React.SetStateAction<boolean>>
}
const defaultValues = {
    deckData: [],
    setDeckData: () => {},
    dashboardData: EMPTY_DASHBOARD,
    setDashboardData: () => {},
    fetched: false,
    setFetched: () => {}
}

const DataContext = createContext<DataContextType>(defaultValues)

export const DataProvider = ({children}: {children: any}) => {
    const [deckData, setDeckData] = useState<DeckType[]>([])
    const [dashboardData, setDashboardData] = useState<DashboardType>(EMPTY_DASHBOARD)
    const [fetched, setFetched] = useState(false)
    

    return (
        <DataContext.Provider value={{deckData, setDeckData, dashboardData, setDashboardData, fetched, setFetched}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    return useContext(DataContext) as DataContextType
}
