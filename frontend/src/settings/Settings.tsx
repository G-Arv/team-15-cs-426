import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Settings.css"
import Layout from "@/components/NavBar/NavSidebarLayout";

export function Settings ({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
        <div className="mt-3 ml-2">
        <header>Settings Page</header>
        </div>
        </Layout>
    // <div className="settingsContainer">
    //     <div>
    //         <SidebarProvider>
    //         <NavSidebar />
    //         <main>
    //             <SidebarTrigger />
    //             {children}
    //         </main>
    //         </SidebarProvider>
    //     </div>

    //     <div className="settingsHeaders">
    //         <header>Settings Page</header>
    //     </div>
    // </div>
    );
}

export default Settings;