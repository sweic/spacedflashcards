import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { NavigateFunction } from "react-router-dom"
import {apiRequest} from './api'

interface AuthUser {
    user: string,
    loading: LoadingStatus,
    error: boolean
}

export type LoadingStatus = 'idle' | 'success' | 'failed' | 'pending'

const initialState: AuthUser = {
    user: '',
    loading: 'idle',
    error: false
} 

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (navigate: NavigateFunction, {dispatch, rejectWithValue}) => {
        const body = {url: 'verifyCookie', method: 'GET', data: '', type: 'VERIFY'}
        const resultAction = await dispatch(apiRequest(body))
        if (apiRequest.rejected.match(resultAction)) {
            navigate('/')
        }
       
        
    }
)

export const loginRequest = createAsyncThunk(
    'auth/loginRequest',
    async ({form, navigate} : any, {dispatch, rejectWithValue}) => {
        const body = {url: 'loginAuth', method: 'POST', data: form.values, type: 'VERIFY'}
        const resultAction = await dispatch(apiRequest(body))
        if (apiRequest.fulfilled.match(resultAction)) {
            navigate('/u/home')
        }
    }
)

export const registerRequest = createAsyncThunk(
    'auth/registerRequest',
    async ({form, navigate}: any, {dispatch}) => {
        const body = {url: 'registerAuth', method: 'POST', data: form.values, type: 'VERIFY'}
        const resultAction = await dispatch(apiRequest(body))
        if (apiRequest.fulfilled.match(resultAction)) {
            navigate('/u/home')
        }
        
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogged(state, action) {
            state.user = action.payload
            state.loading = 'success'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = 'success'
                state.error = false
        })
        .addCase(fetchUser.rejected, (state) => {
            state.loading = 'failed'
            state.user = ''
            state.error = true
        })
        .addCase(loginRequest.pending, (state) => {
            state.loading = 'pending'
            state.error = false
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = 'success'
            state.error = false
        })
        .addCase(loginRequest.rejected, (state) => {
            state.loading = 'failed'
            state.user = ''
            state.error = true
        })
        .addCase(registerRequest.pending, (state) => {
            state.loading = 'pending'
            state.error = false
        })
        .addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = 'success'
            state.error = false
        })
        .addCase(registerRequest.rejected, (state) => {
            state.user = ''
            state.loading = 'failed'
            state.error = false
        })
        
    }
})

export const {userLogged} = authSlice.actions
export default authSlice.reducer