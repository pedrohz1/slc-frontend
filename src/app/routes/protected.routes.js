import { useAuth } from "../../context/auth.context";
import Loading from "../../components/loading";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return <Loading />
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}