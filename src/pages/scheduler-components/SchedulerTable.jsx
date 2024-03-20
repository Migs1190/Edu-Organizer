import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../../App";
import { TableCounter } from "./table-components/TableCounter";
import TableModal from "./table-components/table-modal-components/TableModal";
import { TablePeriodRadios } from "./table-components/TablePeriodRadios";
import { tableBuilder } from "./table-components/tableBuilder";
import { eliminateConflicts, getAllOptions, searchPeriod, rowCounter } from "./table-components/TableManager";

export default function SchedulerTable() {
  const { langOption, finalWorkbook, setFinalWorkbook, finalSchedule } = useContext(ContextData);
  const [timeTable, setTimeTable] = useState([]);
  const [preview, setPreview] = useState(false);
  const [limiter, setLimiter] = useState("all");
  const [section, setSection] = useState("all");
  const [period, setPeriod] = useState("");

  const previewWorkbook = () => {
    setLimiter("all");
    setSection("all");
    setPreview(!preview);
  };

  const filterBySection = (e) => setSection(e.target.value);

  const filterByYear = (e) => setLimiter(e.target.value);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (finalWorkbook.length !== 0) eliminateConflicts(finalWorkbook, setFinalWorkbook);
  }, [finalWorkbook, finalSchedule]);

  return (
    <div className="px-container">
      <TableCounter />
      <TableModal
        preview={preview}
        previewWorkbook={previewWorkbook}
        filterByYear={filterByYear}
        getAllOptions={getAllOptions}
        filterBySection={filterBySection}
        timeTable={timeTable}
        searchPeriod={searchPeriod}
        section={section}
        rowCounter={rowCounter}
        limiter={limiter}
      />
      <div className="content">
        <TablePeriodRadios setPeriod={setPeriod} />
        <Button className="d-block mx-auto" onClick={tableBuilder(setTimeTable, period)}>
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
