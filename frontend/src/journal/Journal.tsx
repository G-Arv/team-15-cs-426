import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./Journal.css"
import Layout from "@/components/NavBar/NavSidebarLayout";

export function Journal ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Layout>
            <div className="mt-3 ml-2">
                {/* <header>Journal Page</header> */}
            </div>
            </Layout>

            <header>Journal Page</header>
        </>

    // <div className="journalContainer">  
    //     <div>
    //         <SidebarProvider>
    //         <NavSidebar />
    //         <main>
    //             <SidebarTrigger />
    //             {children}
    //         </main>
    //         </SidebarProvider>
    //     </div>

    //     <div className="journalHeaders">
    //         <header>Journal Page</header>
    //     </div>
    // </div>
    );
}

export default Journal;