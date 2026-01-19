import { mainApi } from "@/App/mainApi";

const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({


    getUser: builder.query({
      query: () => ({
        url: "users",
        method: 'GET',
      }),
      providesTags: ['User']
    }),

    //with posts
    getUserById: builder.query({
      query: (id) => ({
        url: `users/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    //except me
    getAllUsers: builder.query({
      query: () => ({
        url: "/users/exceptme",
        method: 'GET',
      }),
      providesTags: ['User']
    }),

    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['User']
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getFollowCounts: builder.query({
      query: (id) => `/users/${id}/follow-counts`,
      providesTags: ["User"],
    }),


  })
});

export const { useGetUserQuery, useGetUserByIdQuery, useGetAllUsersQuery, useUpdateUserMutation, useFollowUserMutation, useGetFollowCountsQuery } = userApi;