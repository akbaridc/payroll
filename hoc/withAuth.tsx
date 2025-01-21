/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const ComponentWithAuth = (props: any) => {
        const router = useRouter();
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("auth_token")
                : null;

        useEffect(() => {
            if (!token) {
                router.replace("/"); // Redirect jika tidak ada token
            }
        }, [router, token]);

        if (!token) {
            return null; // Tampilkan loader atau null saat menunggu redirect
        }

        return <WrappedComponent {...props} />;
    };

    // Tambahkan displayName untuk membantu debug
    ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return ComponentWithAuth;
};

export default withAuth;
