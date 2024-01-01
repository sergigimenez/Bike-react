import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'checking', 'not-authenticated', 'authenticated',
    uid: "",
    displayName: "",
    email: "",
    password: "",
    cards: [],
    cardsLiked: [],
    photoUrl: null,
    errorMessage: undefined,
    admin: false,
  },
  reducers: {
    checkingCredentials: (state) => {
      state.status = "checking";
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.name;
      state.cards = payload.cards;
      state.cardsLiked = payload.cardsLiked;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = "";
      state.displayName = "";
      state.email = "";
      state.password = "";
      state.cards = "";
      state.cardsLiked = "";
      state.photoUrl = "";
      state.errorMessage = undefined;
      state.admin = false;
    },
    onFailLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    onFollowCards: (state, { payload }) => {
      state.cards = payload;
    },
    onLikeCards: (state, { payload }) => {
      state.cardsLiked = payload;
    },
    setAdmin: (state) => {
      state.admin = true;
    },
  },
});

export const {
  checkingCredentials,
  onLogin,
  onLogout,
  onFailLogout,
  clearErrorMessage,
  onFollowCards,
  onLikeCards,
  setAdmin,
} = authSlice.actions;
