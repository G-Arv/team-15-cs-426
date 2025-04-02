export interface DateType {
	wholeDate: Date;
	day: string;
	month: string;
	date: string;
	year: string;
}

export interface ReminderCardType {
	name: string;
	amount: number;
	time: string;
}

export interface MedicineInfoType {
	name: string;
	amount: number;
	foodAndPills: number;
	dateRange: string[];
	timeRange: string[];
	weekDays: string[];
}
