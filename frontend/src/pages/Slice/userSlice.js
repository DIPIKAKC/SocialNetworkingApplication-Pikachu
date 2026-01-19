import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocal, removeUserFromLocal, setUserToLocal } from "../Local/local";

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getUserFromLocal()?.user || null,
    token: getUserFromLocal()?.token || null,
  },
  reducers: {

    setUser: (state, action) => {
      state.user = action.payload.user; 
      state.token = action.payload.token;
      setUserToLocal(action.payload);

    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      removeUserFromLocal();
    },

  }
});

export const { setUser, removeUser } = userSlice.actions;
