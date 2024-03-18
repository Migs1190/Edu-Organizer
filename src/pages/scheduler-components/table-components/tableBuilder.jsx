import { useContext } from "react";
import { checkCounter, periodAssigner } from "./TableManager";
import { ContextData } from "../../../App";

export function tableBuilder(setTimeTable, period) {
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
}
