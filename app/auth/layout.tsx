// app/auth/layout.tsx
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/views/layouts/theme-provider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${geistSans.variable} antialiased`}>{children}</div>
    </ThemeProvider>
  );
}
