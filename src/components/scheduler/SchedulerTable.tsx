// biome-ignore lint/style/useImportType: <explanation>
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../../App";
import TableCounter from "./table/TableCounter";
import TableModal from "./table/modal/TableModal";
import { TablePeriodRadios } from "./table/TablePeriodRadios";
import tableBuilder from "./table/tableBuilder";
import { eliminateConflicts } from "./table/TableManager";
import type { TimeTable } from "../../types";

export default function SchedulerTable() {
	const { langOption, finalWorkbook, setFinalWorkbook, finalSchedule } =
		useContext(ContextData);
	const [timeTable, setTimeTable] = useState<TimeTable[]>([]);
	const [preview, setPreview] = useState(false);
	const [limiter, setLimiter] = useState("all");
	const [section, setSection] = useState("all");
	const [period, setPeriod] = useState("0");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (finalWorkbook.length !== 0)
			eliminateConflicts(finalWorkbook, setFinalWorkbook);
	}, [finalWorkbook, finalSchedule]);


	const previewWorkbook = () => {
		setLimiter("all");
		setSection("all");
		setPreview(!preview);
	};

	const filterBySection = (e: React.MouseEvent) =>
		setSection((e.target as HTMLSelectElement).value);
	const filterByYear = (e: React.MouseEvent) =>
		setLimiter((e.target as HTMLSelectElement).value);

	return (
		<div className="px-container">
			<TableCounter />
			<TableModal
				preview={preview}
				previewWorkbook={previewWorkbook}
				filterByYear={filterByYear}
				filterBySection={filterBySection}
				timeTable={timeTable}
				section={section}
				limiter={limiter}
			/>
			<div className="content">
				<TablePeriodRadios setPeriod={setPeriod} />
				<Button
					className="d-block mx-auto"
					onClick={tableBuilder(setTimeTable, period)}
				>
					{langOption("تكوين جدول", "Create a timetable")}
				</Button>
				<Button
					className="previewer-btn d-block mx-auto mt-2"
					disabled={timeTable.length === 0}
					onClick={previewWorkbook}
				>
					{langOption("عرض الجدول", "Preview timetable")}
				</Button>
			</div>
		</div>
	);
}
