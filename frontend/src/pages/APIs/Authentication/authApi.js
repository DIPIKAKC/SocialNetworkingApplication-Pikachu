import { mainApi } from "@/App/mainApi";

export const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        userLogin: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body
            })
        }),

        userRegister: builder.mutation({
            query: (formData) => ({
                url: "users/register",
                method: "POST",
                body: formData,
                formData: true,
            }),
        }),



    })
})

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;