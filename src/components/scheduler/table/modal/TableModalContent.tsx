import TableModalBothFilters from "./TableModalBothFilters";
import TableModalYearFilter from "./TableModalYearFilter";
import TableModalDepFilter from "./TableModalDepFilter";
import TableModalNoFilter from "./TableModalNoFilter";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC } from "react";
import type { TimeTable, Workbook } from "../../../../types";

export type TableModalContentType = {
	timeTable: TimeTable[];
	section: string;
	limiter: string;
};

const TableModalContent: FC<TableModalContentType> = ({
	timeTable,
	section,
	limiter,
}) => {
	if (limiter === "all" && section === "all") {
		return (
			<TableModalNoFilter timeTable={timeTable} section={""} limiter={""} />
		);
	}
	if (limiter === "all" && section !== "all") {
		return (
			<TableModalDepFilter
				timeTable={timeTable}
				section={section}
				limiter={""}
			/>
		);
	}
	if (limiter !== "all" && section === "all") {
		return (
			<TableModalYearFilter
				timeTable={timeTable}
				section={""}
				limiter={limiter}
			/>
		);
	}
	if (limiter !== "all" && section !== "all") {
		return (
			<TableModalBothFilters
				timeTable={timeTable}
				section={section}
				limiter={limiter}
			/>
		);
	}
};

type RowCounterType = (
	p1: Workbook[],
	p2: Workbook[],
	res: string | string[],
	type: string,
) => number;

export const rowCounter: RowCounterType = (p1, p2, res, type) => {
	let count = 1;
	const deleted = [] as string[];
	const period = [...p1, ...p2];

	for (const subject of period) {
		for (const student of subject.enrolledStudents) {
			if (
				(type === "year" &&
					!deleted.includes(subject.subjectCode) &&
					student.year === res) ||
				(type === "dep" &&
					!deleted.includes(subject.subjectCode) &&
					student.dep === res) ||
				(type === "dep-year" &&
					!deleted.includes(subject.subjectCode) &&
					student.dep === res[0] &&
					student.year === res[1])
			) {
				deleted.push(subject.subjectCode);
				count++;
			}
		}
	}

	return count;
};

type SearchPeriodType = (
	period: Workbook[],
	res: string | string[],
	type: string,
) => boolean;

export const searchPeriod: SearchPeriodType = (period, res, type) => {
	switch (type) {
		case "dep":
			return period.some((p) =>
				p.enrolledStudents.some((pe) => pe.dep === res),
			);
		case "year":
			return period.some((p) =>
				p.enrolledStudents.some((pe) => pe.year === res),
			);
		case "dep-year":
			//res is an array in this scenario
			return period.some((p) =>
				p.enrolledStudents.some(
					(pe) => pe.dep === res[0] && pe.year === res[1],
				),
			);
		default:
			return false;
	}
};

export default TableModalContent;
