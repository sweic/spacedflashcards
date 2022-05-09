import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { EMPTY_DASHBOARD } from "../../shared/constants"
import { DashboardType } from "../../shared/types/dashboard"
import { DeckType } from "../../shared/types/deck"
import { RootState } from "../store"
import { apiRequest } from "./api"
import {LoadingStatus} from './auth'


interface DataStore {
    decks: DeckType[],
    dashboardData: DashboardType,
    lastUpdated: number,
    loading: LoadingStatus
}
const initialState: DataStore = {
    decks: [],
    dashboardData: EMPTY_DASHBOARD,
    loading: 'idle',
    lastUpdated: new Date(Date.now()).getDay() - 1
}

export const fetchDecks = createAsyncThunk(
    'dataStore/fetchDecks',
    async (force: boolean, {getState, dispatch}) => {
        const currState = getState() as RootState
        const user = currState.auth.user
        const body = {method: 'POST', url: 'fetchData', type: 'FETCH', data: {user: user, force: force}}
        const resultAction = await dispatch(apiRequest(body))
        console.log(resultAction)
    }
)

const dataSlice = createSlice({
    name: 'dataStore',
    initialState,
    reducers: {
        updateData(state, action) {
            state.decks = action.payload.decks
            state.dashboardData = action.payload.dashboardData
            state.loading = 'success'
            state.lastUpdated = new Date(Date.now()).getDay()
        },
        incrementCount(state, action) {
            const deckID = action.payload
            state.dashboardData.decks.map((deck, idx) => {
                if (deck.id === deckID) {
                    const targetDeck = state.dashboardData.decks[idx]
                    if (targetDeck.count > targetDeck.completion) {
                        state.dashboardData.decks[idx].completion += 1
                        state.dashboardData.currentCompletion += 1
                        return
                    }
                }
            })
        },
        

    },

    extraReducers: (builder) => {
        builder.addCase(fetchDecks.pending, (state) => {
            state.loading = 'pending'
        }).addCase(fetchDecks.fulfilled, (state, action) => {
            state.loading = 'success'
        }).addCase(fetchDecks.rejected, (state) => {
            state.loading = 'failed'
        })
    }

}
)
export const {updateData, incrementCount} = dataSlice.actions
export default dataSlice.reducer
