import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mockzy-backend.onrender.com', // ✅ required in production
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
