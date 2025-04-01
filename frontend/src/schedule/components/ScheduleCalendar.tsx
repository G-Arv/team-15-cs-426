import { Calendar } from "@/components/ui/calendar"
import { Sidebar } from "@/components/ui/sidebar"
import { useState } from "react"

export function CalendarSidebar() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Sidebar side="right" collapsible="none">
            {/* <SidebarHeader> */}
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            {/* </SidebarHeader> */}
        </Sidebar>
    )
}