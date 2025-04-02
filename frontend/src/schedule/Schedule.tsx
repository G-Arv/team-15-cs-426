import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Schedule.css"
import Layout from "@/components/NavBar/NavSidebarLayout";

export function Schedule ({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
        <div className="mt-3 ml-2">
        <header>Schedule Page</header>
        </div>
        </Layout>
    // <div className="scheduleContainer">
    //     <div>
    //         <SidebarProvider>
    //         <NavSidebar />
    //         <main>
    //             <SidebarTrigger />
    //             {children}
    //         </main>
    //         </SidebarProvider>
    //     </div>

    //     <div className="scheduleHeaders">
    //         <header>Schedules Page</header>
    //     </div>
    // </div>
    );
}

export default Schedule;