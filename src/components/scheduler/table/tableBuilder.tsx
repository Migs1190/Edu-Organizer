// biome-ignore lint/style/useImportType: <explanation>
import React, { useContext } from "react";
import { periodAssigner } from "./TableManager";
import { ContextData } from "../../../App";
import type { TimeTable } from "../../../types";
import { checkCounter } from "./TableCounter";

type TableBuilderType = (
  setTimeTable: React.Dispatch<React.SetStateAction<TimeTable[]>>,
  period: string
) => React.MouseEventHandler<HTMLButtonElement>;

const tableBuilder: TableBuilderType = (setTimeTable, period) => {
  const { finalWorkbook, finalSchedule, msgMaker, langOption } = useContext(ContextData);
  return () => {
    try {
      if (!checkCounter(finalWorkbook, finalSchedule, msgMaker, langOption)) return;

      setTimeTable(periodAssigner(finalWorkbook, finalSchedule, period));

      msgMaker("success", langOption("تم تكوين الجدول بنجاح", "Timetable created successfully"));
    } catch (err) {
      msgMaker("warning", langOption("خطأ اثناء تكوين الجدول", "Error while creating the timetable"));
    }
  };
};
export default tableBuilder;
