import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "isLoading",
  initialState: {
    data: { isLoading: false },
  },
  reducers: {
    setLoading: (state, action) => {
      state.data.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
