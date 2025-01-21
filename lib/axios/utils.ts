import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: false,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

AxiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('auth_token');
        // let accessToken;

        // try {
        //     accessToken = token ? token : null;
        // } catch (e) {
        //     console.error("Failed to parse access token:", e);
        // }

        // if (accessToken) {
        //     config.headers.Authorization = token;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default AxiosInstance;
