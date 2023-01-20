import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated',
        uid: '',
        displayName: '',
        email: '',
        password: '',
        cards: [],
        photoUrl: null,
        errorMessage: undefined
    },
    reducers: {
        checkingCredentials: (state) => {
            state.status = 'checking'
            state.errorMessage = undefined
        },
       onLogin: (state, {payload}) => {
            state.status = 'authenticated'
            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.name
            state.cards = payload.cards
            state.errorMessage = undefined
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated'
            state.uid = ''
            state.displayName = ''
            state.email = ''
            state.password = ''
            state.cards = ''
            state.photoUrl = ''
            state.errorMessage = undefined
        },
        onFailLogout: (state, {payload}) => {
            state.status = 'not-authenticated'
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        },
        onFollowCards: (state, {payload}) => {
            state.cards = payload
        }
    }
});


export const { checkingCredentials,onLogin,onLogout, onFailLogout, clearErrorMessage, onFollowCards } = authSlice.actions;
