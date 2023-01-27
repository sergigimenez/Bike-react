import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { cardSlice } from './Card/cardSlice'
import { themeSlice } from './theme/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    card: cardSlice.reducer
  },
})