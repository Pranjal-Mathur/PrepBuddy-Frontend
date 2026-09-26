import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://prepbuddy-vj5y.onrender.com");

const authClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 15000,
});

authClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function register({ username, email, password }) {
    try {
        const response = await authClient.post(
            "/api/auth/register",
            { username, email, password }
        );
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await authClient.post(
            "/api/auth/login",
            { email, password }
        );
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await authClient.get("/api/auth/logout");
        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        localStorage.removeItem("token");
        throw error;
    }
}

export async function getUser() {
    try {
        const response = await authClient.get("/api/auth/getUser");
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}