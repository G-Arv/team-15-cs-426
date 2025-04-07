import { MedicineDialog } from "./components/ScheduleDialog";
import { ScheduleDaily } from "./components/ScheduleDaily";
import CalendarSidebarLayout from "./components/ScheduleCalendarLayout";
import Layout from "@/components/NavBar/NavSidebarLayout";
import "./Schedule.css"

export function Schedule () {
    const date = new Date()
    
    return (
        <>
            <Layout>
                    <div className="mt-3 ml-2 inline-flex">
                    <div className="inline-flex mr-20">
                        <div>
                            <h1 className="text-2xl font-bold mb-4 text-[#2b3674] text-left">Schedules</h1>
                            <div className="inline-flex">
                                <h2 className="text-2xl font-bold mb-4 text-[#2b3674] mr-50 text-left">{date.toLocaleDateString(undefined, {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</h2>

                                <div className="mr-0">
                                    <MedicineDialog />  
                                </div>
                            </div>

                            <ScheduleDaily />
                        </div>
                    </div>

                    <div className="justify-end">
                        <CalendarSidebarLayout children={undefined}/>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Schedule;