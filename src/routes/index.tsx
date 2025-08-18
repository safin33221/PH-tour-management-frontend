import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import AddTour from "@/pages/Admin/AddTour";
import Analysis from "@/pages/Admin/Analysis";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Booking from "@/pages/User/Booking";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "about"
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {
                Component: Analysis,
                path: "analysis"
            },
            {
                Component: AddTour,
                path: "add-tour"
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [
            {
                Component: Booking,
                path: "booking"
            }
        ]
    },
    {
        Component: Login,
        path: "/login",

    },
    {
        Component: Register,
        path: "/sing-up",

    },
    {
        Component: Verify,
        path: "/verify",

    },
])