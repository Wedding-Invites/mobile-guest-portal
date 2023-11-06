import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { EVENT_CREDS, useLocalStorage } from "./useLocalStorage";


const AuthContext = createContext<any>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage(EVENT_CREDS, null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data: any) => {
        setUser(data);
        navigate("/dashboard");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};