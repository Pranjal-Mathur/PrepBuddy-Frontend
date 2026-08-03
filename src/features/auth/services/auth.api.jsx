import axios from "axios";

const BASE_URL = "https://prepbuddy-vj5y.onrender.com";

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/register`,
            { username, email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/login`,
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/auth/logout`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

export async function getUser() {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/auth/getUser`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}