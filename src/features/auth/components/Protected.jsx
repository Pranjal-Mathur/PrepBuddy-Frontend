import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { Loader2 } from "lucide-react";

const Protected = ({ children }) => {
    const { isLoading, user } = useAuth();

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#070707] flex flex-col items-center justify-center text-white px-6">
                <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
                <h2 className="text-xl font-semibold">Loading Prep Buddy...</h2>
                <p className="text-sm text-zinc-400 mt-2 text-center max-w-sm">
                    Connecting to server. Free instances may take a moment to wake up...
                </p>
            </main>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <div>{children}</div>;
};

export default Protected;