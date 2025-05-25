import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSlice from './slices/authSlice'
import onlineUsersSlice from './slices/onlineUsersSlice'
import notificationSlice from './slices/notificationSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        onlineUsers: onlineUsersSlice,
        notifications : notificationSlice
    },


    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)

})

export default store