import { apiSlice } from "./apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/api/users',
                method: 'POST',
                body: data
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/users/logout',
                method : 'GET'
            })
        })

    })
})




export const {
    useLoginUserMutation,
    useLogoutUserMutation
} = userApiSlice