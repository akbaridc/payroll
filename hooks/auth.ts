/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import useSWR from "swr";

export const useAuth = () => {
    const router = useRouter();

    // const hasToken = typeof window !== "undefined" && localStorage.getItem("auth_token");

    // User
    // const { data: user, error, mutate } = useSWR(
    //     hasToken ? "api/user" : null, // Only fetch if session exists
    //     () =>
    //         axios
    //             .get("api/user")
    //             .then((response) => response.data.data)
    //             .catch((error) => {
    //                 if (error.response?.status === 409) {
    //                     throw error;
    //                 }
    //             })
    // );

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    // Logout
    const logout = async () => {
        await axios.post("/api/logout")
            .then(() => {
                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

                localStorage.removeItem("user");
                router.push("/");
            });
    }

    // useEffect(() => {
    //     if (middleware === "guest" && user) return router.push("/backoffice/dashboard");

    //     if (middleware === "auth" && error) return router.push("/");
    // }, [user, error, middleware, router])

    return { csrf, logout }
}