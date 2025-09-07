import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (newReview) => ({
        url: "/post-review",
        method: "POST",
        body: newReview,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Review", id: postId },
      ],
    }),
    getReviewsCount: builder.query({
      query: () => ({
        url: "/get-reviews-count",
      }),
    }),
    getReviewsCountByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result) =>
        result ? [{ type: "Review", id: result[0]?.email }] : [],
    }),
  }),
});

export const { usePostReviewMutation, useGetReviewsCountQuery, useGetReviewsCountByUserIdQuery } = reviewsApi;
