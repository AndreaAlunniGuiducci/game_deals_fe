import { createSlice } from "@reduxjs/toolkit";

export const jwtSlice = createSlice({
  name: "myJWT",
  initialState: {
    data: { jwt: "", username: "" },
  },
  reducers: {
    setUser: (state, action) => {
      state.data.jwt = action.payload.jwt;
      state.data.username = action.payload.username;
    },
  },
});

export const { setUser } = jwtSlice.actions;
