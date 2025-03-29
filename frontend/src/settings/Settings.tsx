import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/NavSidebar/Sidebar";

export function Settings ({ children }: { children: React.ReactNode }) {
    return (
    <>
         <SidebarProvider>
            <AppSidebar />
            <main>
            <SidebarTrigger />
            {children}
            </main>
        </SidebarProvider>

        <header>Settings Page</header>
    </>
    );
}

export default Settings;