
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Medicine } from "@/mockData/dataTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Form, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

"use client"

const medicineSchema = z.object({
    name: z.string(),
    amount: z.coerce.number().gt(0),
    foodMedicine: z.enum(["0", "1", "2"], { // This is the enum of either 0 (before), 1 (during), or 2 (after)
        required_error: "Choose when you would prefer to take your medicine in terms of meals.",
      }),
    startDate: z.date(),
    endDate: z.date(),
    notification: z.string(),
    daysOfWeek: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
})

const daysOfWeekArr = [
    {
      id: "Monday",
      label: "Monday",
    },
    {
      id: "Tuesday",
      label: "Tuesday",
    },
    {
      id: "Wednesday",
      label: "Wednesday",
    },
    {
      id: "Thursday",
      label: "Thursday",
    },
    {
      id: "Friday",
      label: "Friday",
    },
    {
      id: "Saturday",
      label: "Saturday",
    },
    {
        id: "Sunday",
        label: "Sunday",
      },
  ]

export function MedicineDialog() {
    const medForm = useForm<z.infer<typeof medicineSchema>>({
        resolver: zodResolver(medicineSchema),
        defaultValues: {
            name: "",
            amount: 0,
            foodMedicine: undefined,
            startDate: undefined,
            endDate: undefined,
            notification: "8:00 AM",
            daysOfWeek: [],
        }
    })

    // Handles submission of information entered into Add Medicine and currently adds it to the data.json file for user 1. 
    // Parameter: value - an object containing information about a particular medicine verified through zod
    function onSubmit(values: z.infer<typeof medicineSchema>) {
        // TODO: set values of schema into mock data for now, and then put them into the 
        // page as elements in the card
        const newMedicine: Medicine = {
            name: values.name,
            amount: values.amount,
            foodAndPills: parseInt(values.foodMedicine),
            dateRange: [values.startDate, values.endDate],
            timeRange: values.notification.split(","),
            weekDays: values.daysOfWeek
        }

        // TODO: verify that this is working
        console.log(newMedicine)
        const fs = require("fs")

        const userData = fs.readFileSync("src/mockData/data.json")
        const parsedUserData = JSON.parse(userData)
        parsedUserData[0].medicines.push(newMedicine)

        const updatedUserData = JSON.stringify(parsedUserData)
        fs.writeFile("src/mockData/data.json", updatedUserData, (err: any) => {
            if(err) {
                throw err
            }
            else {
                console.log("New data added")
            }
        })
        console.log(newMedicine)
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Add Medicine</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add Medicine Plan</DialogTitle>
            </DialogHeader>
            <Form {...medForm}>
                <form onSubmit={medForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={medForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={medForm.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                        control={medForm.control}
                        name="foodMedicine"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Food and Medicine</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="0" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    Before Meals
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="1" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    During Meals
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="2" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    After Meals
                                    </FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                    />

                    <FormField
                        control={medForm.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                            control={medForm.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                        date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />


                    <FormField
                    control={medForm.control}
                    name="notification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notification Time(s)</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                        control={medForm.control}
                        name="daysOfWeek"
                        render={() => (
                            <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Days of Week</FormLabel>
                            </div>
                            {daysOfWeekArr.map((item) => (
                                <FormField
                                key={item.id}
                                control={medForm.control}
                                name="daysOfWeek"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item.id
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                        {item.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" onClick={() => {
                        // Dunno why I don't see it pop up but the click seems to be working
                        toast("A new medicine has been added!")
                    }}>Submit</Button>
                </form>
            </Form>
            <DialogFooter />
        </DialogContent>
        </Dialog>
    )
}