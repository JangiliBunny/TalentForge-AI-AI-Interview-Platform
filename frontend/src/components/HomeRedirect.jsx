import { Navigate } from "react-router-dom";

function HomeRedirect() {
    const token = localStorage.getItem("token");

    return token
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />;
}

export default HomeRedirect;