import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ContextData } from "../../../App";
import type { LangOption, MessageMaker, Schedule, Workbook } from "../../../types";

type Props = { minDays: { p0: number; p1: number; p2: number } };

const TableCounter = (props: Props) => {
	const { langOption, finalSchedule, finalWorkbook } = useContext(ContextData);
	return (
		<Table className="mx-auto" striped bordered hover size="sm" responsive>
			<tbody>
				<tr>
					<td>{langOption("المقررات المرفوعة", "Number of subjects")}</td>
					<td className="text-center">{finalWorkbook.length}</td>
				</tr>
				<tr>
					<td>{langOption("عدد الأيام المدخلة", "Number of entered days")}</td>
					<td className="text-center">
						{finalSchedule.length} {langOption("يوم", "days")}
					</td>
				</tr>
				<tr>
					<td>{langOption("عدد الأيام المطلوبة لفترة واحدة", "Minimum days in one period")}</td>
					<td className={`text-center ${props.minDays.p0 > finalSchedule.length ? "bg-danger-subtle" : "bg-success-subtle "}`}>{props.minDays.p1}</td>
				</tr>
				<tr>
					<td>{langOption("عدد الأيام المطلوبة لفترتين", "Minimum days in two periods")}</td>
					<td className={`text-center ${props.minDays.p1 > finalSchedule.length ? "bg-danger-subtle" : "bg-success-subtle "}`}>{props.minDays.p0}</td>
				</tr>
			</tbody>
		</Table>
	);
};

type CheckCounterType = (finalWorkbook: Workbook[], finalSchedule: Schedule[], msgMaker: MessageMaker, langOption: LangOption) => boolean;

export const checkCounter: CheckCounterType = (finalWorkbook, finalSchedule, msgMaker, langOption) => {
	if (finalWorkbook.length === 0 || finalSchedule.length === 0) {
		msgMaker(
			"warning",
			finalWorkbook.length === 0
				? langOption("عدد المقررات لا يمكن أن يكون صفر", "Number of Subjects can't be empty")
				: langOption("مدة الامتحانات لا يمكن أن تكون صفر", "Number of Schedule can't be empty"),
		);
		return false;
	}
	return true;
};

export default TableCounter;
