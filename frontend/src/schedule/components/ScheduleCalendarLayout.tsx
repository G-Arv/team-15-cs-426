import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarSidebar } from "./ScheduleCalendar";

export default function CalendarSidebarLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<CalendarSidebar />
			<main className="flex flex-col m-3">
=				<div className="ml-5 mt-2">{children}</div>
			</main>
		</SidebarProvider>
	);
}