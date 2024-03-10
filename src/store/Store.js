import { configureStore } from "@reduxjs/toolkit";
import WatchlistStore from "./WatchListStore";
import AuthStore from "./AuthStore";

const store = configureStore({
    reducer: {
        watchlist: WatchlistStore,
        auth: AuthStore,
    }
})
export default store