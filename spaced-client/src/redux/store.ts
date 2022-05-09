import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import authReducer from './reducers/auth'
import dataReducer from './reducers/decks'
import apiReducer from './reducers/api'
import socialReducer from './reducers/social'

import { updateMiddleware } from "./middleware/update"
import { errorMiddleware } from "./middleware/error"

const middlewares = getDefaultMiddleware({serializableCheck: false}).concat(updateMiddleware, errorMiddleware)
export const store = configureStore({
    reducer: {
        auth: authReducer,
        dataStore: dataReducer,
        api: apiReducer,
        social: socialReducer
    },
    middleware: middlewares
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
