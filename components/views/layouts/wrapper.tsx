// components/ClientWrapper.tsx
"use client"; // This ensures it's rendered client-side

import { useEffect } from "react";
import { useCsrf } from "@/hooks/csrf";
import { AlertDialogProvider } from "@/components/element/context/alert-dialog-context";
import AlertDialog from "@/components/element/dialog/alert-dialog";
import { Loading } from "@/components/utils/loading";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { csrfToken, isLoading, isError } = useCsrf();

  useEffect(() => {
    if (!isLoading && csrfToken) {}
  }, [csrfToken, isLoading]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading CSRF token</div>;

  return (
    <AlertDialogProvider>
      {children}
      <AlertDialog />
    </AlertDialogProvider>
  );
}
