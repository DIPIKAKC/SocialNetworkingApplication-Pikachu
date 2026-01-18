import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const base = 'http://localhost:5000';

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${base}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userSlice?.token;

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: () => ({})
})
