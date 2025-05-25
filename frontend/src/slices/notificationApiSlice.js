import { apiSlice } from './apiSlice'

const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => `/api/notifications`,
        }),
        markAllAsRead: builder.mutation({
            query: () => ({
                url: `/api/notifications/markAllAsRead`,
                method: 'GET'
            })
        }),
    })
})


export const {
    useGetNotificationsQuery,
    useMarkAllAsReadMutation
} = notificationApiSlice