import type { ISidebarItem } from "@/types";

export const generateRoute = (sidebarItems: ISidebarItem[]) => {
    return sidebarItems.flatMap((section) => section.items.map((route) => ({
        path: route.url,
        Component: route.component
    })))
};
