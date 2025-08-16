import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/About";
import Analysis from "@/pages/Analysis";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
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
        Component: Login,
        path: "/login",

    },
    {
        Component: Register,
        path: "/sing-up",

    },
])