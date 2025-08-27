import { baseApi } from "@/redux/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        booking: builder.mutation({
            query: (bookingData) => ({
                url: "/booking",
                method: "POST",
                data: bookingData

            }),
            invalidatesTags: ["BOOKING"]
        })
    })
})

export const {
    useBookingMutation

} = bookingApi