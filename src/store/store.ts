import { configureStore } from "@reduxjs/toolkit";
import { loadingSlice } from "./slices/loadingSlice";

export interface StoreType {
  isLoading: {
    data: { isLoading: boolean };
  };
}

export const store = configureStore({
  reducer: {
    isLoading: loadingSlice.reducer,
  },
});
