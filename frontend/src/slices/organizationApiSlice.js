import { apiSlice } from "./apiSlice";


const organizationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrganization: builder.mutation({
            query: (data) => ({
                url: '/api/organization',
                method: 'POST',
                body: data
            })
        }),
        changeStatus: builder.mutation({
            query: (params) => ({
                url: '/api/organization/changeStatus',
                method: 'PUT',
                params
            })
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: '/api/organization/createUser',
                method: 'POST',
                body: data
            })
        }),
        getAllUsers: builder.query({
            query: (params) => ({
                url: '/api/organization',
                params
            })
        }),
        getOrganizationById: builder.query({
            query: (params) => ({
                url: '/api/organization/getOrganization',
                params
            })
        })
    })
})




export const {
    useCreateOrganizationMutation,
    useChangeStatusMutation,
    useCreateUserMutation,
    useGetOrganizationByIdQuery,
    useGetAllUsersQuery
} = organizationApiSlice