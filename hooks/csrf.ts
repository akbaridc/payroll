// hooks/useCsrf.ts
import useSWR from "swr";
import axios from "@/lib/axios"; // Assuming you have axios setup here

// Custom hook to fetch CSRF token
export const useCsrf = () => {
  const { data, error } = useSWR("/sanctum/csrf-cookie", () => axios.get("/sanctum/csrf-cookie"));

  // If the CSRF token is fetched, set it in Axios headers
  if (data) {
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (csrfToken) {
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    }
  }

  return {
    csrfToken: data,
    isLoading: !error && !data,
    isError: error,
  };
};
