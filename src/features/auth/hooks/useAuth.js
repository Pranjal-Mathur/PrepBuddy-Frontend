import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getUser } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, isLoading, setIsLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setIsLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleRegister = async ({ username, email, password }) => {
    //     setIsLoading(true);
    //     try {
    //         const data = await register({ username, email, password });
    //         setUser(data.user);
    //     } catch (error) {
    //         console.error("Error registering:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const handleRegister = async ({ username, email, password }) => {
        setIsLoading(true);
    
        try {
            const data = await register({ username, email, password });
    
            return data;   // send response back to Register.jsx
    
        } catch (error) {
            console.error("Error registering:", error);
            return null;
    
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetUser = async () => {
        setIsLoading(true);
        try {
            const data = await getUser();
            setUser(data.user);
        } catch (error) {
            console.error("Error getting user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     const getAndSetUser = async () => {
    //         try {
    //             setIsLoading(true);
    //             const data = await getUser();
    //             setUser(data.user);
    //         } catch (error) {
    //             console.error("Error getting user:", error);
    //             setUser(null);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    
    //     getAndSetUser();
    // }, []);


    return {
        user,
        isLoading,
        handleLogin,
        handleLogout,
        handleGetUser,
        handleRegister,
    };
};
