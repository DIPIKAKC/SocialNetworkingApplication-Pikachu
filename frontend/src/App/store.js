import { configureStore } from "@reduxjs/toolkit"
import { mainApi } from "./mainApi.js"
import { userSlice } from "@/pages/Slice/userSlice.js"

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]:mainApi.reducer,
        [userSlice.name]:userSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(mainApi.middleware)
        
})