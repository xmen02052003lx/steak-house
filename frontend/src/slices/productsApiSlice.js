import { PRODUCTS_URL } from "../constants"
import { apiSlice } from "./apiSlice" // this slice dealding with asynchronous request so we need apiSlice (createApi)

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        // this is a query so GET request
        url: PRODUCTS_URL
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"]
    }),
    getProductDetails: builder.query({
      query: productId => {
        console.log("productId in slice", productId)
        return {
          url: `${PRODUCTS_URL}/${productId}`
        }
      },
      keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"]
    }),
    updateProduct: builder.mutation({
      query: data => {
        console.log("data", data)
        return {
          // url: `${PRODUCTS_URL}/${data.productId}`,
          url: `${PRODUCTS_URL}/${data.get("productId")}`,
          method: "PUT",
          body: data
        }
      },
      invalidatesTags: ["Products"]
    }),
    uploadProductImage: builder.mutation({
      query: data => ({
        url: `/api/upload`,
        method: "POST",
        body: data
      })
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE"
      }),
      providesTags: ["Product"]
    }),
    createReview: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"]
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5
    })
  })
})

// this is a convention: when it is a query => "use" + query's name + "Query"
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice
