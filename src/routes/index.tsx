import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoute } from "@/utils/generateRoute";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Tours from "@/pages/Tours";
import ToursDetails from "@/pages/ToursDetails";
import Booking from "@/pages/Booking";
import Home from "@/pages/Home";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Home,
                index: true
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Tours,
                path: "tours"
            },
            {
                Component: ToursDetails,
                path: "tours/:id"
            },
            {
                Component: withAuth(Booking),
                path: "booking/:id"
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analysis" /> },
            ...generateRoute(adminSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [
            { index: true, element: <Navigate to="/user/booking" /> },
            ...generateRoute(userSidebarItems)]
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
    {
        Component: Unauthorized,
        path: "/un-authorized",

    },
])