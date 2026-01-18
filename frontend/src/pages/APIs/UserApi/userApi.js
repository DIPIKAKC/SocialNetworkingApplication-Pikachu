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

    updateUser: builder.mutation({
      query: ({id,formData}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['User']
    }),

  })
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;