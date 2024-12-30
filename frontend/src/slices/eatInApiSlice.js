import { apiSlice } from "./apiSlice" // this slice dealding with asynchronous request so we need apiSlice (createApi)
import { EAT_IN_URL } from "../constants"

export const eatInApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createBooking: builder.mutation({
      query: data => ({
        url: `${EAT_IN_URL}/booking`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"]
    }),
    getBookings: builder.query({
      query: () => ({
        // this is a query so GET request
        url: `${EAT_IN_URL}/booking`
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"]
    }),
    checkinTable: builder.mutation({
      query: id => ({
        url: `${EAT_IN_URL}/tables/${id}`,
        method: "PUT"
      }),
      invalidatesTags: ["Products"]
    }),
    uncheckinTable: builder.mutation({
      query: id => ({
        url: `${EAT_IN_URL}/tables/uncheckin/${id}`,
        method: "PUT"
      }),
      invalidatesTags: ["Products"]
    })
  })
})

// this is a convention: when it is a query => "use" + query's name + "Query"
export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useCheckinTableMutation,
  useUncheckinTableMutation
} = eatInApiSlice
