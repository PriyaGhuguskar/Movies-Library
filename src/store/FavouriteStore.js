import { createSlice } from '@reduxjs/toolkit'

const initialState = [];
const FavoriteStore = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        }
    }
})
export const { add } = FavoriteStore.actions;
export default FavoriteStore.reducer;