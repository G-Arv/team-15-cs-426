import "./App.css";
import NavBar from "../components/NavBar";
import "./App.css";
import { LongButton, PrimaryButton } from "@/components/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import mockData from "../mockData/data.json";
import { DateType, MedicineInfoType, ReminderCardType } from "@/interface";

function ReminderCard({
	amount,
	name,
	time,
}: {
	amount: number;
	name: string;
	time: string;
}) {
	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>
					{amount} {name}
				</CardTitle>
				<CardDescription>{time}</CardDescription>
			</CardHeader>
		</Card>
	);
}

function ReminderCardsList({
	drugsData,
	today,
}: {
	drugsData: MedicineInfoType[];
	today: DateType;
}) {
	return drugsData.map((medicine: MedicineInfoType) => {
		if (
			new Date(medicine.dateRange[0]).valueOf() < today.wholeDate.valueOf() &&
			new Date(medicine.dateRange[1]).valueOf() > today.wholeDate.valueOf() &&
			medicine.weekDays.includes(today.day)
		) {
			return (
				<ReminderCard
					name={medicine.name}
					amount={medicine.amount}
					time={medicine.timeRange[0]}
				/>
			);
		}
		return <></>;
	});
}

function App() {
	const [today, setToday] = useState<DateType>({
		day: "",
		date: "",
		month: "",
		year: "",
		wholeDate: new Date(),
	});
	useEffect(() => {
		const getToday = () => {
			const monthNames = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			const dayNames = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			];
			const today = new Date();
			return {
				wholeDate: today,
				day: dayNames[today.getDay()],
				month: monthNames[today.getMonth()],
				date: JSON.stringify(today.getDate()),
				year: JSON.stringify(today.getFullYear()),
			};
		};
		setToday(getToday());
	}, []);
	return (
		<div>
			<div>
				<span>Hi username! How are you doing today? </span>
				<h1 className="text-text-title">
					{today.day}, {today.month} {today.day}, {today.year}
				</h1>
			</div>
			<div className="flex flex-col gap-4">
				<ReminderCardsList drugsData={mockData[0].medicines} today={today} />
			</div>
			<div>
				<h1 className="text-text-title">Medical Tips</h1>
			</div>
		</div>
	);
}

export default App;
