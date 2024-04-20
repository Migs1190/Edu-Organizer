// biome-ignore lint/style/useImportType: <explanation>
import React, { useContext } from "react";
import { checkCounter, periodAssigner } from "./TableManager";
import { ContextData } from "../../../App";
import type { TimeTable } from "../../../types";

type TableBuilderType = (
  setTimeTable: React.Dispatch<React.SetStateAction<TimeTable[]>>,
  period: string
) => React.MouseEventHandler<HTMLButtonElement>;

const tableBuilder: TableBuilderType = (setTimeTable, period) => {
  const { finalWorkbook, finalSchedule, msgMaker, langOption } = useContext(ContextData);
  return () => {
    try {
      if (!checkCounter(finalWorkbook, finalSchedule, msgMaker, langOption)) return;

      periodAssigner(finalWorkbook, finalSchedule, setTimeTable, period);

      msgMaker("success", langOption("تم تكوين الجدول بنجاح", "Timetable created successfully"));
    } catch (err) {
      msgMaker("warning", langOption("خطأ اثناء تكوين الجدول", "Error while creating the timetable"));
    }
  };
};
export default tableBuilder;
