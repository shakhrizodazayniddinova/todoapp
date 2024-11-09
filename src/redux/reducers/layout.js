import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: JSON.parse(localStorage.getItem('darkmode')) || 'light',
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,

    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = state.darkMode === 'light' ? 'dark' : 'light';
        }
    }
})

export const {toggleDarkMode} = layoutSlice.actions;
export default layoutSlice.reducer;