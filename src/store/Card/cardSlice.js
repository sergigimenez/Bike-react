import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cards: []
    },
    reducers: {
        setCard: (state, action) => {
            state.cards.push(action.payload)
        },
        initialCards :(state, action) => {
            state.cards = []
        }
    }
});


export const { setCard, initialCards } = cardSlice.actions;