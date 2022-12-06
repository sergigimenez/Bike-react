import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        primary: "#1C6758",
        title: "#3D8361",
        secondary: '#D6CDA4',
        background: '#EEF2E6',
        backgroundCard: '#F9F6F7',
        color: '#EEF2E6'
    },
    reducers: {

    }
});


export const { } = themeSlice.actions;