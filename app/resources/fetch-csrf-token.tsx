import axios from "axios";

const fetchCsrfToken = async () => {
    try {
        await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
            {
                withCredentials: true,
            },
        );
        // console.log('CSRF token fetched and cookie set');
    } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
    }
};

export default fetchCsrfToken;
