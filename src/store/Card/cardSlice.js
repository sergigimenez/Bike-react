import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cards: [],
        provincias: [],
        poblaciones: [],
        titleCard: [],
        statusSearch: 'not-searched',
        statusUpdate: false,
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
            state.cards.map(c => {
                if (c.id == action.payload.idCard) {
                    return c.stateComents.likes = action.payload.totalLikes
                }
            })
        },
        updateImage: (state, action) => {
            console.log(action)
            state.cards.map(c => {
                if (c.id == action.payload.cardId) {
                    return c.img = action.payload.cardImg
                }
            })
        }
    }
});


export const { clearCards, setCard, setProvincias, setPoblaciones, setTitleCard,
    setStatusSearch, setStatusUpdate, setTotalResults, updateLikesOneCard,
    updateImage } = cardSlice.actions;