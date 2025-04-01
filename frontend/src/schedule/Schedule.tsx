import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Schedule.css"

export function Schedule ({ children }: { children: React.ReactNode }) {
    return (
    <div className="scheduleContainer">
        <div>
            <SidebarProvider>
            <NavSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
            </SidebarProvider>
        </div>

        <div className="scheduleHeaders">
            <header>Schedules Page</header>
        </div>
    </div>
    );
}

export default Schedule;