import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cards: [],
        provincias: [],
        poblaciones: [],
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
        setPoblaciones: (state, action) => {
            state.poblaciones = action.payload
        },
        setTitleCard: (state, action) => {
            state.titleCard = action.payload
        },
        setStatusSearch: (state) => {
            state.statusSearch = 'searched'
        },
        setTotalResults: (state, action) => {
            state.totalResults = action.payload
        },
        updateLikesOneCard: (state, action) => {
            state.cards.find(c => {
                if(c.id == action.payload.idCard){
                    return c
                } 
            }).stateComents.likes = action.payload.totalLikes
        }
    }
});


export const { clearCards, setCard, setProvincias, setPoblaciones, setTitleCard, setStatusSearch, setTotalResults, updateLikesOneCard } = cardSlice.actions;