import Booking from "@/pages/User/Booking";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "History",
        items: [
            {
                title: "Booking",
                url: "/user/booking",
                component: Booking
            },

        ],
    },

]