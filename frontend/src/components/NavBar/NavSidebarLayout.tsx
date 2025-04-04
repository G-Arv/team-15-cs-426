import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { NavSidebar } from "./NavSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        // <div className="inline-flex">
            <SidebarProvider>
            <NavSidebar />
            <main className="width-full height-full">
                <SidebarTrigger className="absolute m-0"/>
                {children}
            </main>
            </SidebarProvider>
        // </div>
    )
}