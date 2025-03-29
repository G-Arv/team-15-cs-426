import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/NavSidebar/Sidebar";

export function Journal ({ children }: { children: React.ReactNode }) {
    return (
    <>
        <SidebarProvider>
            <AppSidebar />
            <main>
            <SidebarTrigger />
            {children}
            </main>
        </SidebarProvider>

        <header>Journal Page</header>
    </>
    );
}

export default Journal;