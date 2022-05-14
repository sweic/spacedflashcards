import { Middleware } from "@reduxjs/toolkit";
import { loginError, registerError } from "../reducers/auth";

export const errorMiddleware: Middleware = storeAPI => next => async action => {
    next(action)
    if (action.type.includes('apiFailed')) {
        switch(action.payload.payload.type) {
            case 'LOGIN':
                storeAPI.dispatch(loginError())
                return
            case 'REGISTER':
                 if (action.payload.error.response.data.errorCode === 1) {
                     storeAPI.dispatch(registerError('Email'))
                 } else {
                     storeAPI.dispatch(registerError('Username'))
                 }
                 return
        }
    }
}