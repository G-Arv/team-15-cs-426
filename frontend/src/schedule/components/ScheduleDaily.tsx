import { useState, useRef, useEffect } from "react";
import { ScheduleCard } from "./ScheduleCard";

// Creates a card for each medicine the user has
export function ScheduleDaily() {
    // const scheduleCards = displayData()
    // console.log("did it get here to components?")
    const [data, setData] = useState<any>([])
    const ref = useRef<any[]>([])
    // const [cards, setCards] = useState<any>([])
    let count = 0;

    const fetchData = async (ignore: boolean) => {
        await fetch('src/mockData/data.json')
        .then((res) => {
            if(!res.ok) {
                throw new Error('Error with retrieving data')
            }
            else {
                return res.json()
            }
        })
        .then((resData) => {
            if(resData && resData.length > 0) {
                const meds = resData[0].medicines
              //  console.log(meds.length + "Run # " + count + " currently in ref " + ref.current[0].name + " and " + ref.current[1].name)
                for(let i = 0; i < meds.length; ++i) {
                    if(count == 1 && !ignore) {
                        console.log(ignore + " and " + data)
                        ref.current = data
                        break;
                    }
                    else if (ignore) {
                        ref.current = data
                        break
                    }
                    else {
                         console.log("Number of cards created: " + i)
                         ref.current.push(<ScheduleCard key={meds[i].name + i.toString()} medicineInfo={meds[i]} />)
                         console.log("After push, this is ref: " + ref.current)
                    }
                }
                setData(ref.current)
                console.log(data + " and current ref " + ref.current)
                count++
            }
        }) 
        .catch(e => console.error("Failed to retrieve data:  " + e))  
    }

    useEffect(() => {
        let ignore = false

        fetchData(ignore)
        console.log("ran once")
        return () => {
            ref.current = []
            console.log(ref.current)
            ignore = true
        }
    }, [])

    // if(ref.current) {
    //     console.log(ref)
    //     for(let i = 0; i < ref.current.length; ++i) {
    //         setCards([...cards, <ScheduleCard medicineInfo={ref.current[i]}/>]) 
    //     }
    // }

    console.log("Got to render " + ref.current)

    return (
        <>
            {ref.current}
        </>
    )
}