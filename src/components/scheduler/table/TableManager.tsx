// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
import type {
	SavedTimeTable,
	Schedule,
	TimeTable,
	Workbook,
} from "../../../types";


type EliminateConflicts = (
	finalWorkbook: Workbook[],
	setFinalWorkbook: React.Dispatch<React.SetStateAction<Workbook[]>>,
) => void;

export const eliminateConflicts: EliminateConflicts = (
	finalWorkbook,
	setFinalWorkbook,
) => {
	//Loop through all subjects and check for conflicts
	for (const A of finalWorkbook) {
		for (const B of finalWorkbook) {
			//Skip if the subjects are the same
			if (A.subjectCode === B.subjectCode) continue;
			//Loop through all students in A and B
			for (const as of A.enrolledStudents) {
				for (const bs of B.enrolledStudents) {
					//Are the students the same and the subjects different?
					if (
						as.id === bs.id &&
						A.conflictedSubjects.every((c) => c !== B.subjectCode)
					)
						// add the conflicted subject to A
						A.conflictedSubjects.push(B.subjectCode);
				}
			}
		}
	}

	setFinalWorkbook(finalWorkbook);
};

type SaveTableType = (table: TimeTable[]) => void;
const saveTable: SaveTableType = (table) => {
	if (!localStorage.getItem("savedTables"))
		localStorage.setItem("savedTables", JSON.stringify([]));

	const tempTables: SavedTimeTable[] = JSON.parse(
		localStorage.getItem("savedTables") as string,
	);
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

type PeriodAssignerType = (
	finalWorkbook: Workbook[],
	finalSchedule: Schedule[],
	setTimeTable: React.Dispatch<React.SetStateAction<TimeTable[]>>,
	period: string,
) => void;

export const periodAssigner: PeriodAssignerType = (
	finalWorkbook,
	finalSchedule,
	setTimeTable,
	period,
) => {
	let tempTable = [] as TimeTable[];
	const deleted = [] as string[];

	//Loop through all days
	for (const S of finalSchedule) {
		//Push a new day to the table
		tempTable.push({ ...S, Period1: [], Period2: [] });
		//Loop through all subjects
		for (const W of finalWorkbook) {
			//Is the subject repeated?
			if (deleted.includes(W.subjectCode)) continue;
			//Did the user choose period 1 or 2 (indexed 1 and 2)?
			if (
				(+period === 1 || +period === 0) &&
				(tempTable[tempTable.length - 1].Period1.length === 0 ||
					!tempTable[tempTable.length - 1].Period1.some((s) =>
						s.conflictedSubjects.includes(W.subjectCode),
					))
			) {
				//Yes? Push the subject to the day
				tempTable[tempTable.length - 1].Period1.push(W);
				deleted.push(W.subjectCode);
			} else if (
				(+period === 2 || +period === 0) &&
				(tempTable[tempTable.length - 1].Period2.length === 0 ||
					!tempTable[tempTable.length - 1].Period2.some((s) =>
						s.conflictedSubjects.includes(W.subjectCode),
					))
			) {
				tempTable[tempTable.length - 1].Period2.push(W);
				deleted.push(W.subjectCode);
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
	setTimeTable(tempTable);

	saveTable(tempTable);
};
