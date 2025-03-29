import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/NavSidebar/Sidebar";

export function Profile ({ children }: { children: React.ReactNode }) {
    return (
    <>
        <SidebarProvider>
            <AppSidebar />
            <main>
            <SidebarTrigger />
            {children}
            </main>
        </SidebarProvider>
        
        <header>Profile Page</header>
    </>
    );
}

export default Profile;