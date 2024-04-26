import "../styles/AppLectures.min.css";
// biome-ignore lint/style/useImportType: <explanation>
import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import SlidingNav from "../components/lectures/SlidingNav";
import { lecWorksheetProcessor } from "../components/lectures/worksheetProcessor";
import type { lecturesTableType } from "../components/lectures/worksheetProcessor";
import type { SheetValues } from "../types";
import LectureDashboard from "../components/lectures/LectureDashboard";
import { ContextData } from "../App";
import { readSingleFile } from "../components/general/fileReader";
import DashboardFilter from "../components/lectures/DashboardFilter";

export type WorkSheetMap = Map<string, SheetValues>;

const AppLectures = () => {
	const { msgMaker, langOption } = useContext(ContextData);
	const [lecMap, setLecMap] = useState<WorkSheetMap>(new Map());
	const [LecWorksheet, setLecWorksheet] = useState<lecturesTableType>({} as lecturesTableType);
	const lecturesSection = useRef<HTMLDivElement>(null);

	const [week, setWeek] = useState("odd");
	const [day, setDay] = useState("sat");

	/* #region UseEffects */
	useEffect(() => {
		if (localStorage.getItem("LecWorksheet")) {
			setLecWorksheet(JSON.parse(localStorage.getItem("LecWorksheet") as string));
		}
	}, []);

	useEffect(() => {
		if (lecMap.size === 0) return;
		const worksheet = lecWorksheetProcessor(lecMap) as lecturesTableType;
		setLecWorksheet(worksheet);
	}, [lecMap]);
	/* #endregion */

	/* #region Functions */
	const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		//If no files are uploaded, return -- TypeScript
		if (e.target.files === null) return msgMaker("warning", "No files uploaded");
		const file = e.target.files[0];
		//Is the file an excel file
		if (!file.name.includes("xls") && !file.name.includes("xlsx")) {
			//No? Show a warning notification
			return msgMaker("warning", langOption("امتداد ملف غير مدعوم", "Unsupported file extension"));
		}

		setLecMap(await readSingleFile(file));
	};

	const checkEmptySheet = () => {
		if (Object.entries(LecWorksheet).length === 0)
			return (
				<div ref={lecturesSection} className="display-4 fw-medium ">
					{langOption("لا يوجد جدول مرفوع", "No file Selected")}
				</div>
			);
		localStorage.setItem("LecWorksheet", JSON.stringify(LecWorksheet));
		return (
			<div ref={lecturesSection}>
				<DashboardFilter setDay={setDay} setWeek={setWeek} />
				<LectureDashboard LecWorksheet={LecWorksheet} day={day} week={week} />
			</div>
		);
	};
	/* #endregion */

	return (
		<section id="lectures" className="">
			<SlidingNav lecturesSection={lecturesSection} handleFile={handleFile} />
			<div id="lec-dashboard" className="d-flex justify-content-center align-items-center p-3">
				{checkEmptySheet()}
			</div>
		</section>
	);
};
export default AppLectures;
