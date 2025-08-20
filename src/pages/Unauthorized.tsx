import { Link } from "react-router";

export default function Unauthorized() {
    return (
        <div>
            <h1>Your are not authorized for access this page</h1>
            <Link to={`/`}>Home</Link>
        </div>
    );
};
