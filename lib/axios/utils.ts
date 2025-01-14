import axios from "axios";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: { 
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
     },
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('auth_token');
        let accessToken;

        try {
            accessToken = token ? token : null;
        } catch (e) {
            console.error("Failed to parse access token:", e);
        }

        // If token is present, add it to request's Authorization Header
        if (accessToken) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Response Interceptor
AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        // You can add specific error handling logic
        return Promise.reject(error);
    }
);

export default AxiosInstance;
