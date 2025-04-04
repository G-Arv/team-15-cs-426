import NavBar from "../components/NavBar";
import { ScheduleDaily } from "./components/ScheduleDaily";
import { MedicineDialog } from "./components/ScheduleDialog";
import Layout from "@/components/NavBar/NavSidebarLayout";


export function Schedule () {
    const date = new Date()
    
    return (
    <>

        <Layout>
        <div className="mt-3 ml-2">
            <h1 className="text-2xl font-bold mb-4 text-[#2b3674] font-[Avenir]">Schedules</h1>
            <h2 className="text-2xl font-bold mb-4 text-[#2b3674] font-[Avenir]">{date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })}</h2>


            <ScheduleDaily />

            <MedicineDialog />
        </div>
        </Layout>

        {/* <header>Schedule Page</header> */}
    </>
    );
}

export default Schedule;