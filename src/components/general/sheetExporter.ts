import { utils, writeFile } from "xlsx";
import type { TimeTable } from "../../types";

type CombinedSheet = {
	"عدد الطلاب": number;
	الفترة: string;
	التاريخ: string;
	اليوم: string;
	"اسم المقرر": string;
	"كود المقرر": string;
	الشعبة: string;
	المستوى: string;
}[];

const ExportSheet = (timeTable: TimeTable[]): void => {
	const fileName = prompt("أدخل اسم الملف");
	if (fileName == null) return;

	const tempSheet: CombinedSheet = [];

	//Loop through days of the timetable
	for (const day of timeTable) {
		//Loop through the subjects of the first period of the day
		for (const subject of day.Period1) {
			//Loop through the students enrolled in the subject
			for (const student of subject.enrolledStudents) {
				//Push the data of the student and the subject to the tempSheet array
				tempSheet.push({
					"عدد الطلاب": subject.enrolledStudents.length,
					الفترة: "12 : 10",
					التاريخ: day.fullDate.ar,
					اليوم: day.day.ar,
					"اسم المقرر": subject.subjectName,
					"كود المقرر": subject.subjectCode,
					الشعبة: student.dep,
					المستوى: subject.subjectYear,
				});
			}
		}
		//Loop through the subjects of the second period of the day
		for (const subject of day.Period2) {
			//Loop through the students enrolled in the subject
			for (const student of subject.enrolledStudents) {
				//Push the data of the student and the subject to the tempSheet array
				tempSheet.push({
					"عدد الطلاب": subject.enrolledStudents.length,
					الفترة: "3 : 1",
					التاريخ: day.fullDate.ar,
					اليوم: day.day.ar,
					"اسم المقرر": subject.subjectName,
					"كود المقرر": subject.subjectCode,
					الشعبة: student.dep,
					المستوى: subject.subjectYear,
				});
			}
		}
	}

	//Remove duplicate rows from the tempSheet array
	const cleanedSheet: CombinedSheet = [];
	const deleted: string[] = [];
	//Loop through the subjects of the tempSheet array
	for (const subject of tempSheet) {
		//Is the subject already in the cleanedSheet array?
		if (!deleted.includes(JSON.stringify(subject))) {
			//No? Then push it to the cleanedSheet array and add it to the deleted array
			cleanedSheet.push(subject);
			deleted.push(JSON.stringify(subject));
		}
	}
	//Initialize a new Excel file
	const wb = utils.book_new();
	//Convert the cleanedSheet array to an Excel sheet
	const ws = utils.json_to_sheet(cleanedSheet);
	//Append the sheet to the Excel file
	utils.book_append_sheet(wb, ws, "timetable");

	//Create a new Excel file with the timetable data
	//If the user doesn't enter a file name, the file will be named "timetable"
	writeFile(wb, `${fileName || "timetable"}.xlsx`);
};
export default ExportSheet;
