import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
      }),
    }),
  }),
})




// export react hook
export const { useGetDetailsQuery } = authApi
