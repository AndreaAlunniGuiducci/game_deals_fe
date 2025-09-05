import { createSlice } from "@reduxjs/toolkit";

export const jwtSlice = createSlice({
  name: "myJWT",
  initialState: {
    data: { jwt: '' },
  },
  reducers: {
    setJwt: (state, action) => {
      state.data.jwt = action.payload;
    },
  },
});

export const { setJwt } = jwtSlice.actions;
