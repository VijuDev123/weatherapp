import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

// RootState type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// Export the store
export default store;