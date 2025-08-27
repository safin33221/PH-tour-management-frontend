import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITourPackage } from "@/types/tour.type";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData
            }),
            invalidatesTags: ["TOUR"]
        }),
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["TOUR"]
        }),
        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TOUR"]
        }),
        getAllTours: builder.query({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
        }),
        getTourType: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            providesTags: ["TOUR"]
        })
    })
})

export const {
    useGetTourTypeQuery,
    useAddTourTypeMutation,
    useRemoveTourTypeMutation,
    useAddTourMutation,
    useGetAllToursQuery
} = tourApi