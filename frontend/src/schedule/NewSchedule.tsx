import { SidebarProvider } from "@/components/ui/sidebar"
import { MedicineDialog } from "./components/ScheduleDialog"
import { ScheduleDaily } from "./components/ScheduleDaily"
import './Schedule.css'

function Schedule({ children }: { children: React.ReactNode }) {

    const date = new Date()

    return (
        <div className="scheduleContainer">
            {/* <div>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </div> */}

            <div className="scheduleHeaders">
                <h1>Schedules</h1>
                <h2>{date.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}</h2>


                <ScheduleDaily />
            </div>
    
            <div className="scheduleMedicine">
                <MedicineDialog />
            </div>

            {/* <div className="calendarSidebar">
                <SidebarProvider>
                    <CalendarSidebar />
                </SidebarProvider>
            </div> */}
        </div>


    )
}

export default Schedule