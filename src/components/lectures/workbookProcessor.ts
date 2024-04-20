import { utils } from "xlsx";
import type { WorkSheetMap } from "../../pages/AppLectures";

type lectureDayType = {
	classroom: string;
	period: string;
	lecture: string;
	code: string;
	professor: string;
	department: string;
	releventDep: string;
	year: string;
};

// type lecturesTableType = {
// 	odd: {
// 		sat: lectureDayType[];
// 		sun: lectureDayType[];
// 		mon: lectureDayType[];
// 		tue: lectureDayType[];
// 		wed: lectureDayType[];
// 		thu: lectureDayType[];
// 	};
// 	even: {
// 		sat: lectureDayType[];
// 		sun: lectureDayType[];
// 		mon: lectureDayType[];
// 		tue: lectureDayType[];
// 		wed: lectureDayType[];
// 		thu: lectureDayType[];
// 	};
// };

export const lecWorkbookProcessor = (worksheet: WorkSheetMap) => {
	if (worksheet.size === 0) return;

	const lectureTable = {
		odd: {
			sat: [],
			sun: [],
			mon: [],
			tue: [],
			wed: [],
			thu: [],
		},
		even: {
			sat: [],
			sun: [],
			mon: [],
			tue: [],
			wed: [],
			thu: [],
		},
	};

	let currentWeek = "even";
	let currentDay = "sat";
	let currentPeriod = "";
	let currentClassroom = "";
	let currentDep = "";
	const tempObj = {} as lectureDayType;
	let counter = 0; //Counter to keep track of the 5 rows of classroom data
	console.log(worksheet);
	for (const [k, v] of worksheet) {
		const currentCol = utils.decode_cell(k).c; //Number
		const currentEncCol = utils.encode_col(utils.decode_cell(k).c); //String
		const currentEncRow = utils.encode_row(utils.decode_cell(k).r); //String
		const currentRow = utils.decode_cell(k).r; //Number
		const currentVal = v.v as string;

		if (k === "AN244") currentWeek = "odd";

		if (
			currentRow < 3 ||
			currentCol < utils.decode_col("E") ||
			(currentCol > utils.decode_col("AD") &&
				currentCol < utils.decode_col("AQ")) ||
			currentCol > utils.decode_col("BP")
		)
			continue; //Skip the first 3 rows and the first 5 columns and the empty columns in the middle and end of the sheet (not needed)

		//Is the current column an odd number? (classroom data is in odd columns)
		if (currentCol % 2 !== 0) {
			//Is the pointer on a cell in the same row as a day cell?
			if (worksheet.get(`C${currentEncRow}`)?.v) {
				//yes? then assign the current classroom
				currentClassroom = worksheet.get(
					`${getShiftedValue(currentCol, "col", -1)}3`,
				)?.v as string;
				//and assign the current day
				currentDay = worksheet.get(`C${currentEncRow}`)?.v as string;
				//Convert the day name to a short form
				switch (currentDay.trim()) {
					case "السبت":
					case "الســـــــــــــــــــــــــــــــــــــــــــــــبـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــت":
						currentDay = "sat";
						break;
					case "الأحد":
					case "الاحد":
						currentDay = "sun";
						break;
					case "الاثنين":
						currentDay = "mon";
						break;
					case "الثلاثاء":
						currentDay = "tue";
						break;
					case "الأربعاء":
					case "الاربعاء":
						currentDay = "wed";
						break;
					case "الخميس":
						currentDay = "thu";
						break;
					default:
						throw new Error("Invalid day name");
				}
				//Assign the classroom to the current lecture object
				tempObj.classroom = currentClassroom;
			}

			//Is the pointer on a cell in the same row as a period cell?
			if (worksheet.get(`D${currentEncRow}`)?.v) counter = 0; //yes? reset the counter

			switch (counter) {
				case 0: //The first row of classroom data
					//get the period and department from the same row
					currentPeriod = worksheet.get(`D${currentEncRow}`)?.v as string;
					currentDep = worksheet.get(
						`${getShiftedValue(currentCol, "col", -1)}${currentEncRow}`,
					)?.v as string;
					//Assign the period and department to the current lecture object
					tempObj.period = currentPeriod;
					tempObj.department = currentDep;
					tempObj.year = currentVal;
					break;
				case 1: //The second row of classroom data
					//Assign the relevant department to the current lecture object
					tempObj.releventDep = currentVal;
					break;
				case 2: //The third row of classroom data
					//Assign the subject code to the current lecture object
					tempObj.code = currentVal;
					break;
				case 3: //The fourth row of classroom data
					tempObj.lecture = currentVal;
					break;
				case 4: //The fifth and last row of classroom data
					//Assign the professor to the current lecture object
					tempObj.professor = currentVal;
					//Wrap up the current lecture object and push it to the lecture table
					lectureTable[currentWeek][currentDay].push({ ...tempObj });
					break;
			}
			counter++;
		}
	}
	return lectureTable;
};

const getShiftedValue = (value: number, type: "row" | "col", shift: number) => {
	return type === "row"
		? utils.encode_row(value + shift)
		: utils.encode_col(value + shift);
};
