import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/products/productsApi";
import { reviewsApi } from "./features/reviews/reviewsApi";
import { authApi } from "./features/users/authApi";
import authReducer from "./features/users/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    // products api and reducers
    [productsApi.reducerPath]: productsApi.reducer,
    // reviews api and reducers
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewsApi.middleware
    ),
});
