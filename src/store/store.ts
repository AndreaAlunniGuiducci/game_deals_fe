import { configureStore } from "@reduxjs/toolkit";
import { loadingSlice } from "./slices/loadingSlice";
import { jwtSlice } from "./slices/jwtSlice";

export interface StoreType {
  isLoading: {
    data: { isLoading: boolean };
  };
  myJWT: {
    data: { jwt: string };
  };
}

export const store = configureStore({
  reducer: {
    isLoading: loadingSlice.reducer,
    myJWT: jwtSlice.reducer,
  },
});
