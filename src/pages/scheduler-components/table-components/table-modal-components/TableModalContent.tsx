import TableModalBothFilters from "./TableModalBothFilters";
import TableModalYearFilter from "./TableModalYearFilter";
import TableModalDepFilter from "./TableModalDepFilter";
import TableModalNoFilter from "./TableModalNoFilter";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC } from "react";
import type { TimeTable } from "../../SchedulerTable";

export type TableModalContentType = {
  timeTable: TimeTable[];
  section?: string;
  limiter?: string;
};

const TableModalContent: FC<TableModalContentType> = ({ timeTable, section, limiter }) => {
  if (limiter === "all" && section === "all") {
    return <TableModalNoFilter timeTable={timeTable} />;
  }
  if (limiter === "all" && section !== "all") {
    return <TableModalDepFilter timeTable={timeTable} section={section} />;
  }
  if (limiter !== "all" && section === "all") {
    return <TableModalYearFilter timeTable={timeTable} limiter={limiter} />;
  }
  if (limiter !== "all" && section !== "all") {
    return <TableModalBothFilters timeTable={timeTable} section={section} limiter={limiter} />;
  }
};
export default TableModalContent;
