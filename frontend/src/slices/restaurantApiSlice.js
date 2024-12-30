import { RESTAURANT_URL, CHECKIN_URL, PICKUP_URL } from "../constants"
import { apiSlice } from "./apiSlice" // this slice dealding with asynchronous request so we need apiSlice (createApi)

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // with this, we dont need to use fetch/axios (which is cool in my opinion)

    getRestaurantDetails: builder.query({
      query: () => ({
        url: RESTAURANT_URL
      }),
      keepUnusedDataFor: 5
    }),

    updateRestaurant: builder.mutation({
      query: data => ({
        url: RESTAURANT_URL,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),
    getTables: builder.query({
      query: () => ({
        url: `${RESTAURANT_URL}/tables`
      }),
      keepUnusedDataFor: 5
    }),
    getTableDetails: builder.query({
      query: id => ({
        url: `${RESTAURANT_URL}/tables/${id}`
      }),
      keepUnusedDataFor: 5
    })
  })
})

// this is a convention: when it is a query => "use" + query's name + "Query"
// this is what we bring into our component whenever we want to use this and fetch our data
export const {
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
  useGetTablesQuery,
  useGetTableDetailsQuery,
  useCheckinMutation,
  usePickupDishMutation
} = restaurantApiSlice
