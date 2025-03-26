type User = {
	firstName: string,
	lastName: string,
	gender: string,
	age: number,
	phoneNumber: number,
	email: string,
	lastVisit: string, // this is a longer string of visit information
	userName: string,
	password: string,
	allergies: string[],
	medicines: Medicine[],
	vitals: Vitals[],
	documents: Documents[]
};

type Medicine = {
	name: string,
	amount: number,
	foodAndPills: number,  // 0 = before, 1 = during, 2 = after
	dateRange: Date[],   // require a starting date, no end date = infinite
	timeRange: string[], // includes multiple times during the day if needed more than once
	weekDays: string[]
}

type Vitals = {
	bloodGlucoseBefore: number, // in mg/dt
	bloodGlucoseAfter: number, // in mg/dt
	temperature: number, // in fahrenheit
	height: number, // in cm
	weight: number, // in kg
	bloodPressure: number, // in mm hg
};

type Documents = {
	name: string,
	file: string // can get by key which can be considered as name
}

export type { User, Medicine, Vitals, Documents}
