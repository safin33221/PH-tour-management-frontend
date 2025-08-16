import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
        <div>
            <h1>AdminLayout Component</h1>
            <Outlet></Outlet>
        </div>
    );
};
