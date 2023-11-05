import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    console.log(user);
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};