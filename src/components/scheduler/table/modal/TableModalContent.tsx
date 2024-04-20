import TableModalBothFilters from "./TableModalBothFilters";
import TableModalYearFilter from "./TableModalYearFilter";
import TableModalDepFilter from "./TableModalDepFilter";
import TableModalNoFilter from "./TableModalNoFilter";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC } from "react";
import type { TimeTable } from "../../../../types";

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
export default TableModalContent;
