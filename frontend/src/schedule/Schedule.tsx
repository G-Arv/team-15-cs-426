import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/NavSidebar/Sidebar";

export function Schedule ({ children }: { children: React.ReactNode }) {
    return (
    <>  
        <SidebarProvider>
            <AppSidebar />
            <main>
            <SidebarTrigger />
            {children}
            </main>
        </SidebarProvider>

        <header>Schedule Page</header>
    </>
    );
}

export default Schedule;