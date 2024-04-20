import "../styles/AppLectures.min.css";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import SlidingNav from "../components/lectures/SlidingNav";
import { lecWorkbookProcessor } from "../components/lectures/workbookProcessor";
import type { SheetValues } from "../types";

export type WorkSheetMap = Map<string, SheetValues>;

function AppLectures() {
	const [LecWorkbook, setLecWorkbook] = useState<WorkSheetMap>(new Map()); //TODO fix this into map later
	const lecturesSection = useRef<HTMLDivElement>(null);

	useEffect(() => {
		lecWorkbookProcessor(LecWorkbook);
	}, [LecWorkbook]);

	return (
		<>
			<SlidingNav
				lecturesSection={lecturesSection}
				setLecWorkbook={setLecWorkbook}
			/>
		</>
	);
}
export default AppLectures;
