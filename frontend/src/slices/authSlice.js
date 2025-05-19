import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mockzyUser: localStorage.getItem('mockzyUser') ?
        JSON.parse(localStorage.getItem('mockzyUser')) : null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentails: (state, action) => {
            state.mockzyUser = action.payload
            localStorage.setItem('mockzyUser', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.mockzyUser = null
            localStorage.clear()
        }
    }
})


export const { setCredentails, logout } = authSlice.actions
export default authSlice.reducer