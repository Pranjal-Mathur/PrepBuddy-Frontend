import { createContext, useEffect, useState } from "react";
import { getUser } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            // If no token exists, the user is unauthenticated.
            // Avoid blocking on Render cold-start for unauthenticated visitors.
            if (!token) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            try {
                const data = await getUser();
                setUser(data.user);
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};