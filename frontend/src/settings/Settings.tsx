import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Settings.css"

export function Settings ({ children }: { children: React.ReactNode }) {
    return (
    <div className="settingsContainer">
        <div>
            <SidebarProvider>
            <NavSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
            </SidebarProvider>
        </div>

        <div className="settingsHeaders">
            <header>Settings Page</header>
        </div>
    </div>
    );
}

export default Settings;