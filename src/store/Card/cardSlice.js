import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cards: [],
        provincias: [],
        titleCard: [],
        statusSearch: 'not-searched',
        totalResults: 0
    },
    reducers: {
        clearCards: (state) => {
            state.cards = []
        },
        setCard: (state, action) => {
            state.cards = action.payload
        },
        setProvincias: (state, action) => {
            state.provincias = action.payload
        },
        setTitleCard: (state, action) => {
            state.titleCard = action.payload
        },
        setStatusSearch: (state) => {
            state.statusSearch = 'searched'
        },
        setTotalResults: (state, action) => {
            state.totalResults = action.payload
        }
    }
});


export const { clearCards, setCard, setProvincias, setTitleCard, setStatusSearch, setTotalResults } = cardSlice.actions;