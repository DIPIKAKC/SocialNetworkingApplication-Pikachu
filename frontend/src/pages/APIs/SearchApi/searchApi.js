import { mainApi } from "@/App/mainApi";

const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({


    search: builder.query({
      query: (q) => ({
        url: `/search`,
        method: 'GET',
        params: {q}
      }),
      providesTags: ['User']
    }),


  })
});

export const {useSearchQuery} = searchApi;