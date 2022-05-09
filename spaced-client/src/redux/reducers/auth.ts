import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { NavigateFunction } from "react-router-dom"
import {apiRequest} from './api'

interface AuthUser {
    user: string,
    loading: LoadingStatus,
    error: AuthError
}

interface AuthError {
    login: boolean,
    register: 'Username' | 'Email' | ''
}

export type LoadingStatus = 'idle' | 'success' | 'failed' | 'pending'

const initialState: AuthUser = {
    user: '',
    loading: 'idle',
    error: {
        login: false,
        register: ''
    }
} 

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, {dispatch, rejectWithValue}) => {
        const body = {url: 'verifyCookie', method: 'GET', data: '', type: 'VERIFY'}
        const resultAction = await dispatch(apiRequest(body))
        
    }
)

export const loginRequest = createAsyncThunk(
    'auth/loginRequest',
    async ({form, navigate} : any, {dispatch, rejectWithValue}) => {
        const body = {url: 'loginAuth', method: 'POST', data: form.values, type: 'LOGIN'}
        const resultAction = await dispatch(apiRequest(body))
        if (apiRequest.fulfilled.match(resultAction)) {
            navigate('/u/home')
        }
    }
)

export const registerRequest = createAsyncThunk(
    'auth/registerRequest',
    async ({form, navigate}: any, {dispatch}) => {
        const body = {url: 'registerAuth', method: 'POST', data: form.values, type: 'REGISTER'}
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
        },
        loginError(state) {
            state.error.login = true
        },
        registerError(state, action) {
            state.error.register = action.payload
        },
        resetErrors(state) {
            state.error.login = false
            state.error.register = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = 'success'
        })
        .addCase(fetchUser.rejected, (state) => {
            state.loading = 'failed'
            state.user = ''
        })
        .addCase(loginRequest.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = 'success'
        })
        .addCase(loginRequest.rejected, (state) => {
            state.loading = 'failed'
            state.user = ''
        })
        .addCase(registerRequest.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = 'success'
        })
        .addCase(registerRequest.rejected, (state) => {
            state.user = ''
            state.loading = 'failed'
        })
        
    }
})

export const {userLogged, loginError, registerError, resetErrors} = authSlice.actions
export default authSlice.reducer