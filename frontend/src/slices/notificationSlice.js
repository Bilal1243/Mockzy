import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.list = action.payload;
        },
        addNotification: (state, action) => {
            state.list.unshift(action.payload); // Add latest to top
        },
    },
});

export const { setNotifications, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
