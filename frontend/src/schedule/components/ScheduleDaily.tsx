import { useMemo } from "react";
import { ScheduleCard } from "./ScheduleCard";
import { Medicine } from "@/mockData/dataTypes";
import mockData from "./../../mockData/data.json"

// Stores the four timeslots that medicine cards can be sorted through
let morning: Medicine[] = [] // 6:00 AM - 12:00 PM
let afternoon: Medicine[] = [] // 12:00 PM - 5:00 PM
let evening: Medicine[] = [] // 5:00 PM - 10:00 PM
let night: Medicine[] = [] // 10:00 PM - 6:00 PM

// Determines whether a medicine should be displayed on a particular date
// Parameters: medicineInfo: the specific medicine
// Return: boolean
const medicineDate = (medicineInfo: any) => {
    const start = medicineInfo.dateRange[0]
    const end = medicineInfo.dateRange[1]
    const weekDayValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date()
    const dayOfWeek = weekDayValues[today.getDay()]
    
    const findWeekDay = () => {
        for(let i = 0; i < medicineInfo.weekDays.length; ++i) {
            if(medicineInfo.weekDays[i] == dayOfWeek) {
                return true;
            }
        }
        return false;
    }

    return Date.parse(start) < Date.parse(today.toLocaleDateString()) &&  
    Date.parse(today.toLocaleDateString()) < Date.parse(end) && findWeekDay()
}

// Determines how each medicineInfo card is sorted into the timeslots above, 
// and creates new medicineInfo cards if the medicine has multiple times 
// it is taken per day.
// Parameters: medicineInfo: the specific medicine
const medicineTime = (medicineInfo: any) => {
    console.log(medicineInfo)
    let times = medicineInfo.timeRange
    
    for(let i = 0; i < times.length; ++i) {
        let currTime = times[i].split(" ")
        let timeSplit = currTime[0].split(":")
        let newTime: Medicine = {
            name: medicineInfo.name,
            amount: medicineInfo.amount,
            foodAndPills: medicineInfo.foodAndPills,
            dateRange: medicineInfo.dateRange,
            timeRange: [times[i]],
            weekDays: medicineInfo.weekDays
        }

        // Morning
        if(currTime[1] == "AM" && (parseInt(timeSplit[0]) > 6 && parseInt(timeSplit[0]) < 12)) {
            morning.push(newTime)
        }
        
        // Afternoon
        else if(currTime[1] == "PM" && (parseInt(timeSplit[0]) == 12 || parseInt(timeSplit[0]) < 5)) {
            afternoon.push(newTime)
        }
        
        // Evening
        else if(currTime[1] == "PM" && (parseInt(timeSplit[0]) > 6 && parseInt(timeSplit[0]) < 10)) {
            evening.push(newTime)
        }
        
        // Night
        else {
            night.push(newTime)
        }
    }
}

// Sorts the times for each array to ensure they are displayed in the correct order.
// This is used in the createCards function.
// Parameters: arr, which is the current array of information to be displayed in
// and isNight, which is a boolean determining whether or not the array is for the night
// Return: any[]
const sortTimes = (arr: any[], isNight: boolean) => {
    let res = [];
    
    // Sorts the night array differently as there are two sets of times to be sorted
    // between 10:00 PM to 1:00 AM and 1:00 AM to 6:00 AM
    if(isNight) {
        let pmArr = []
        let amArr = []
        
        for(let i = 0; i < arr.length; ++i) {
            if(parseInt(arr[i].timeRange[0]) >= 10) {
                pmArr.push(arr[i])
            }
            else {
                amArr.push(arr[i])
            }
        }
        
        let sortedPMArr = pmArr.sort((a, b) => parseInt(a.timeRange[0]) - parseInt(b.timeRange[0]))
        let sortedAMArr = amArr.sort((a, b) => parseInt(a.timeRange[0]) - parseInt(b.timeRange[0]))
        
        res = sortedPMArr.concat(sortedAMArr)
    }
    else {
        res = arr.sort((a, b) => parseInt(a.timeRange[0]) - parseInt(b.timeRange[0]))
    }
    
    return res
}

// Creates an individual card component for each card in the given array
// Parameters: info, which is the original array of times of day, cardArr,
// which is a new array where the new cards will be stored, and isNight, 
// which is a boolean determining whether the array is the night array
// Return: any[]
const createCards = (info: any[], cardArr: any[], isNight: boolean) => {
    let sortedInfo = sortTimes(info, isNight);

    for(let i = 0; i < sortedInfo.length; ++i) {
        cardArr.push(<ScheduleCard key={sortedInfo[i].name + i.toString()} medicineInfo={sortedInfo[i]} />)
    }

    
    return cardArr;
}

// Creates the cards to display after running MedicineTime
const displayCards = () => {
    if(morning.length == 0 && afternoon.length == 0 && evening.length == 0 && night.length == 0) {
        return (
            <p>No medicines to display. Click Add to add new medicines.</p>
        )
    }
    else {
        let morningCards: any[] = []
        let afternoonCards: any[] = []
        let eveningCards: any[] = []
        let nightCards: any[] = []

        // Runs createCards for each of the four times of day
        morningCards = createCards(morning, morningCards, false)
        afternoonCards = createCards(afternoon, afternoonCards, false)
        eveningCards = createCards(evening, eveningCards, false)
        nightCards = createCards(night, nightCards, true)

        // Creates components based on times of day and whether there is a medicine at that time of day
        return (
            <>
                <div>
                    {morningCards.length == 0 ? null :
                    <>
                        <h2>Morning</h2>
                        {morningCards}
                    </>
                    }
                </div>
                <div>
                    {afternoonCards.length == 0 ? null :
                    <>
                        <h2>Afternoon</h2>
                        {afternoonCards}
                    </>
                    }
                </div>
                <div>
                    {eveningCards.length == 0 ? null :
                    <>
                        <h2>Evening</h2>
                        {eveningCards}
                    </>
                    }
                </div>
                <div>
                    {nightCards.length == 0 ? null :
                    <>
                        <h2>Night</h2>
                        {nightCards}
                    </>
                    }
                </div>
            </>
        )
    }
}

// Creates a card for each medicine the user has
// Return: React Component
export function ScheduleDaily() {
    
    // Uses user 0 as the initial user
    const currUser = mockData[0]    

    for(let i = 0; i < currUser.medicines.length; ++i) {
        if(medicineDate(currUser.medicines[i])) {
            medicineTime(currUser.medicines[i])
        }
    }

    const res = useMemo(() => displayCards(), [])

    return (
        <>
            {res}
        </>
    )
}