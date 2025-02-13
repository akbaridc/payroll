import "./globals.css";

import ClientWrapper from "@/components/views/layouts/wrapper";

import "react-datepicker/dist/react-datepicker.css";

export const metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ClientWrapper>
                    {children}
                </ClientWrapper>
            </body>
        </html>
    );
}
