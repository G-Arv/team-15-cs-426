import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { NavSidebar } from "./NavSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<NavSidebar />
			<main className="flex flex-col m-3">
				<SidebarTrigger className="sticky" />
				<div className="ml-5 mt-2">{children}</div>
			</main>
		</SidebarProvider>
	);
}
