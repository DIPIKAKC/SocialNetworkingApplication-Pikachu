import { mainApi } from "@/App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const postsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getPosts: builder.query({
            query: (query) => ({
                url: 'posts',
                method: 'GET',
                params: query //for search
            }),
            providesTags: ['Post'] 
        }),

        getSinglePost: builder.query({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET',
            }),
            providesTags: ['Post'] //It obeys 'invalidatetags' of the hook where data is expired. the hook provides task to re-fetch the data as it was expired.
        }),

        getMyPosts: builder.query({
            query: () => ({
                url: "posts/myposts",
                method: "GET",
            }),
            providesTags: ["Posts"],
        }),

        createPost: builder.mutation({
            query: (data) => ({ //data=>createPost object
                url: 'posts',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${data.token}`,

                },
                body: data.body
            }),
            invalidatesTags: ['Post'] //It expires the existng chache memory when the hook is called and action is performed . It is done to prepare for auto-refetch
        }),

        removePost: builder.mutation({
            query: (data) => ({
                url: `/posts/${data.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
            invalidatesTags: ['Post']
        }),

        updatePost: builder.mutation({
            query: (data) => ({
                url: `/posts/${data.id}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
                body: data.body,
            }),
            invalidatesTags: ['Post']
        }),


        //like post
        toggleLikePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/${postId}/like`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Post'],
        }),

    })
})

export const { useGetPostsQuery, useGetSinglePostQuery, useGetMyPostsQuery, useCreatePostMutation, useUpdatePostMutation, useRemovePostMutation, useToggleLikePostMutation } = postsApi;