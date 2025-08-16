import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/About";
import Analysis from "@/pages/Analysis";
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
        Component: AdminLayout,
        path: "/admin",
        children: [
            {
                Component: Analysis,
                path: "analysis"
            }
        ]
    }
])