import { Navigate, createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/login"
import Register from "./features/auth/pages/register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/ai/pages/Home"
import Interview from "./features/ai/pages/Interview"
import PreviousReports from "./features/ai/pages/PreviousReports";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Page not found</h1>
                <p className="mt-3 text-zinc-300">Go back to login or register.</p>
            </div>
        </main>
    )
}

export const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Navigate to="/register" replace />
    // },
    {
        path : "/login",
        element: <Login />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : "/",
        element : <Protected><Home/></Protected>
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path : "/interview/:interviewid",
        element : <Protected><Interview/></Protected>
    },
    // {
    //     path:"/reports",
    //     element:
    //       <Protected>
    //         <PreviousReports/>
    //       </Protected>
    //   }
])
