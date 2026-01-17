import { mainApi } from "@/App/mainApi";

const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({


    getUser: builder.query({
      query: ({token}) => ({
        url: `/users`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      providesTags: ['User']
    }),

    updateUser: builder.mutation({
      query: ({id,token,body}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: body
      }),
      invalidatesTags: ['User']
    }),

  })
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;