import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || "",
          color: color || "",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || "",
          page: page.toString(),
          limit: limit.toString(),
        });
        return `/get-all-products?${queryParams}`;
      },
      providesTags: ["Product"],
    }),
    fetchSingleProductById: builder.query({
      query: (id) => `/get-product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchSingleProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
productsApi;
