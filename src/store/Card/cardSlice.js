import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cards: []
    },
    reducers: {
        setCard: (state, action) => {
            state.cards.push(action.payload)
        }
    }
});


export const { setCard } = cardSlice.actions;