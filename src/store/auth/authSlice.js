import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated',
        user: {},
        uid: '',
        displayName: '',
        email: '',
        password: '',
        photoUrl: null,
        errorMessage: undefined
    },
    reducers: {
        checkingCredentials: (state) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
       onLogin: (state, {payload}) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.errorMessage = undefined
        },
        onFailLogout: (state, {payload}) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    }
});


export const { checkingCredentials,onLogin,onLogout, onFailLogout, clearErrorMessage } = authSlice.actions;
