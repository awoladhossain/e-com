import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/users/authApi";
import  authReducer  from "./features/users/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
