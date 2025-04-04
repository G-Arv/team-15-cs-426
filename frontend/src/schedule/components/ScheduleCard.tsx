import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock } from "lucide-react"

// Displays a single medicine a user utilizes at a specific time
// Return: Component
export function ScheduleCard({medicineInfo}: any) {
    // Determines when a user uses their medicine (morning, afternoon, evening)
    const medicineMeals = medicineInfo.foodAndPills 
    let medicineMealsDisplay = "At any time" 
    if(medicineMeals == 0) {
        medicineMealsDisplay = "Before Meals"
    }
    else if(medicineMeals == 1) {
        medicineMealsDisplay = "During Meals"
    }
    else if (medicineMeals == 2) {
        medicineMealsDisplay = "After Meals"
    }


    return (
        <Card className="mb-10 bg-[#c2eecc] font-[Avenir]">
            <CardHeader>
                <CardTitle >{medicineInfo.name}</CardTitle>
                <div className="inline-flex">
                <Clock strokeWidth={2} size={18} color="#717171" className="ml-14 mr-2"/>
                <CardDescription className="">{medicineInfo.timeRange[0]}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>Amount: {medicineInfo.amount}</p>
                <p>When to take: {medicineMealsDisplay}</p>
            </CardContent>
            <CardFooter>
                <p className="ml-8 mr-2">Complete? </p>
                <Checkbox />
            </CardFooter>
        </Card>
    )
}