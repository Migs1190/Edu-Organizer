import type { SavedTimeTable, Schedule, TimeTable, Workbook } from "../../../types";

type EliminateConflicts = (finalWorkbook: Workbook[]) => Workbook[];

export const eliminateConflicts: EliminateConflicts = (finalWorkbook) => {
	//Loop through all subjects and check for conflicts
	for (const A of finalWorkbook) {
		for (const B of finalWorkbook) {
			//Skip if the subjects are the same
			if (A.subjectCode === B.subjectCode) continue;
			//Loop through all students in A and B
			for (const as of A.enrolledStudents) {
				for (const bs of B.enrolledStudents) {
					//Are the students the same and the subjects different?
					if (as.id === bs.id && A.conflictedSubjects.every((c) => c !== B.subjectCode))
						// add the conflicted subject to A
						A.conflictedSubjects.push(B.subjectCode);
				}
			}
		}
	}
	return finalWorkbook;
};

type SaveTableType = (table: TimeTable[]) => void;
const saveTable: SaveTableType = (table) => {
	if (!localStorage.getItem("savedTables")) localStorage.setItem("savedTables", JSON.stringify([]));

	const tempTables: SavedTimeTable[] = JSON.parse(localStorage.getItem("savedTables") as string);
	tempTables.reverse();
	if (tempTables.length >= 15) tempTables.splice(0, 1);
	tempTables.push({
		content: table,
		dateAr: new Date().toLocaleString("ar").split("،"),
		dateEn: new Date().toLocaleString("en-GB").split(","),
	});
	tempTables.reverse();
	localStorage.setItem("savedTables", JSON.stringify(tempTables));
};

type PeriodAssignerType = (finalWorkbook: Workbook[], finalSchedule: Schedule[], period: string, test?: boolean) => TimeTable[];

export const periodAssigner: PeriodAssignerType = (finalWorkbook, finalSchedule, period, test = false) => {
	let tempTable = [] as TimeTable[];
	const deleted = [] as string[];

	//Loop through all days
	for (const day of finalSchedule) {
		//Push a new day to the table
		tempTable.push({ ...day, Period1: [], Period2: [] });
		//Loop through all subjects
		for (const subject of finalWorkbook) {
			//Is the subject repeated?
			if (deleted.includes(subject.subjectCode)) continue;
			//Did the user choose period 1 or 2 (indexed 1 and 2)?
			if (
				(+period === 1 || +period === 0) &&
				(tempTable[tempTable.length - 1].Period1.length === 0 ||
					!tempTable[tempTable.length - 1].Period1.some((s) => s.conflictedSubjects.includes(subject.subjectCode)))
			) {
				//Yes? Push the subject to the day
				tempTable[tempTable.length - 1].Period1.push(subject);
				deleted.push(subject.subjectCode);
			} else if (
				(+period === 2 || +period === 0) &&
				(tempTable[tempTable.length - 1].Period2.length === 0 ||
					!tempTable[tempTable.length - 1].Period2.some((s) => s.conflictedSubjects.includes(subject.subjectCode)))
			) {
				tempTable[tempTable.length - 1].Period2.push(subject);
				deleted.push(subject.subjectCode);
			}
		}
	}

	//eliminate empty days
	tempTable = tempTable.filter((t) => {
		if (
			(+period === 1 && t.Period1.length !== 0) ||
			(+period === 2 && t.Period2.length !== 0) ||
			(+period === 0 && (t.Period1.length !== 0 || t.Period2.length !== 0))
		)
			return t;
	});
	if (!test) saveTable(tempTable);

	return tempTable;
};
