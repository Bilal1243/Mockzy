import { apiSlice } from "./apiSlice";

const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addDepartment: builder.mutation({
            query: (data) => ({
                url: '/api/departments',
                method: 'POST',
                body: data
            })
        }),
        getAllDepartments: builder.query({
            query: (params) => ({
                url: '/api/departments',
                params
            })
        }),
        getFacultiesByDepartment: builder.query({
            query: ({ departmentId, organization }) => ({
                url: `/api/departments/${departmentId}/${organization}/faculties`
            })
        })
    })
})


export const {
    useAddDepartmentMutation,
    useGetAllDepartmentsQuery,
    useLazyGetFacultiesByDepartmentQuery
} = departmentApiSlice