import AppNavbar from "@/components/navbar/app-navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      defaultOpen
      className="bg-gradient-to-r from-red-400 to-w-100"
    >
      <AppSidebar />
      <main>
        <AppNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
