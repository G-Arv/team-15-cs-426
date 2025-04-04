import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Profile.css";
import Layout from "@/components/NavBar/NavSidebarLayout";

export function Profile ({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
        <div className="mt-3 ml-2">
        <header>Profile Page</header>
        </div>
        </Layout>
    // <div className="profileContainer">
    //     <div>
    //         <SidebarProvider>
    //         <NavSidebar />
    //         <main>
    //             <SidebarTrigger />
    //             {children}
    //         </main>
    //         </SidebarProvider>
    //     </div>

    //     <div className="profileHeaders">
    //         <header>Profile Page</header>
    //     </div>
    // </div>
    );
}

export default Profile;