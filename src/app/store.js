import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";

// A store is simply, a place to store the state of the variables in our app
// Creating a store using the configureStore
export const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    }
    
})
