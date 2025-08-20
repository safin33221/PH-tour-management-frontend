import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
import Analysis from "@/pages/Admin/Analysis";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytic",
                url: "/admin/analysis",
                component: Analysis
            },

        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                component: AddTour
            },
            {
                title: "Add Tour Type",
                url: "/admin/add-tour-type",
                component: AddTourType
            },

        ],
    }
]