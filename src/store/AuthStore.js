import { createSlice } from '@reduxjs/toolkit'


const AuthStore = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;

        },
    }
})
export const { login, logout } = AuthStore.actions;
export default AuthStore.reducer;