// app/backoffice/layout.tsx
import localFont from "next/font/local";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/views/layouts/app-sidebar";
import { ThemeProvider } from "@/components/views/layouts/theme-provider";
import { ModeToggle } from "@/components/views/layouts/mode-toggle";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function BackofficeLayout({
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
      <SidebarProvider>
        <AppSidebar />
        <main className={`${geistSans.variable} flex flex-1 flex-col w-full`}>
          <header className="flex h-16 items-center px-4 gap-2 justify-between">
            <SidebarTrigger />
            <ModeToggle />
          </header>
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
