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
            { index: true, element: <Navigate to="/admin/analysis" /> },
            ...generateRoute(adminSidebarItems)]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [
            { index: true, element: <Navigate to="/admin/booking" /> },
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
])