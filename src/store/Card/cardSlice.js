import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cards: [],
        cardsState: [],
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
            state.cards = action.payload.map(card => {
                state.cardsState.push({
                    "idCard": card.id,
                    "likes": card.stateComents.likes,
                    "comentarios": card.stateComents.comentarios,
                    "comments": card.comments
                })

                return {
                    "img": card.img,
                    "titleCard": card.titleCard,
                    "info": {
                        "Distancia": card.info.Distancia,
                        "Desnivel": card.info.Desnivel,
                        "Fecha_confirmada": card.info.Fecha_confirmada,
                        "Poblacion": card.info.Poblacion,
                        "Provincia": card.info.Provincia,
                        "Precio": card.info.Precio,
                        "Facebook": card.info.Facebook,
                        "Web": card.info.Web,
                        "Instagram": card.info.Instagram,
                        "Twitter": card.info.Twitter,
                        "Youtube": card.info.Youtube,
                    },
                    "id": card.id
                }
            })

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
            state.cardsState.map(statusLikes => {
                if (statusLikes.idCard == action.payload.idCard) {
                    return statusLikes.likes = action.payload.totalLikes
                }
            })
        },
        updateImage: (state, action) => {
            console.log(action)
            state.cardsState.map(c => {
                if (c.idCard == action.payload.cardId) {
                    return c.img = action.payload.cardImg
                }
            })
        },
        addCommentSlice: (state, action) => {
            state.cardsState.map(card => {
                if (card.idCard == action.payload.idCard) {
                    card.comentarios = action.payload.totalComentario
                    card.comments.push(action.payload.comentario)
                }
            })
        },
        deleteCommentSlice: (state, action) => {
            state.cardsState.map(card => {
                if (card.idCard == action.payload.idCard) {
                    card.comentarios = action.payload.totalComentario
                    card.comments = card.comments.filter(comment => {
                        return comment.id != action.payload.deleteCommentId
                    })
                }
            })
        }
    }
});


export const { clearCards, setCard, setProvincias, setPoblaciones, setTitleCard,
    setStatusSearch, setStatusUpdate, setTotalResults, updateLikesOneCard,
    updateImage, addCommentSlice, deleteCommentSlice } = cardSlice.actions;