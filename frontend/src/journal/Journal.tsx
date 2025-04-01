import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Journal.css"

export function Journal ({ children }: { children: React.ReactNode }) {
    return (
    <div className="journalContainer">  
        <div>
            <SidebarProvider>
            <NavSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
            </SidebarProvider>
        </div>

        <div className="journalHeaders">
            <header>Journal Page</header>
        </div>
    </div>
    );
}

export default Journal;