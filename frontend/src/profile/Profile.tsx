import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Profile.css";

export function Profile ({ children }: { children: React.ReactNode }) {
    return (
    <div className="profileContainer">
        <div>
            <SidebarProvider>
            <NavSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
            </SidebarProvider>
        </div>

        <div className="profileHeaders">
            <header>Profile Page</header>
        </div>
    </div>
    );
}

export default Profile;