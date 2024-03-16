import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../../App";
import { TableCounter } from "./table-components/TableCounter";
import { TableModal } from "./table-components/TableModal";
import { TablePeriodRadios } from "./table-components/TablePeriodRadios";

export default function AppTable() {
  const { lang, finalWorkbook, setFinalWorkbook, finalSchedule, msgMaker } = useContext(ContextData);
  const [timeTable, setTimeTable] = useState([]);
  const [preview, setPreview] = useState(false);
  const [limiter, setLimiter] = useState("all");
  const [section, setSection] = useState("all");
  const [period, setPeriod] = useState("");

  //The function `previewWorkbook` sets the limiter and section to "all" and toggles the preview state.
  const previewWorkbook = () => {
    setLimiter("all");
    setSection("all");
    setPreview(!preview);
  };

  //The function "showSection" sets the value of a section based on the target value of an event.
  const showSection = (e) => setSection(e.target.value);

  // The function "showYear" sets the value of "limiter" based on the value of the target element in the event object.
  const showYear = (e) => setLimiter(e.target.value);

  //assign conflicts to each student in the `finalWorkbook` array when there are changes to the `finalWorkbook` or `finalSchedule` arrays.
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
        showYear={showYear}
        getAllOptions={getAllOptions}
        showSection={showSection}
        timeTable={timeTable}
        searchPeriod={searchPeriod}
        section={section}
        rowCounter={rowCounter}
        limiter={limiter}
      />
      <div className="content">
        <TablePeriodRadios setPeriod={setPeriod} />
        <Button
          className="d-block mx-auto"
          onClick={tableBuilder(finalWorkbook, finalSchedule, msgMaker, lang, setTimeTable, period)}
        >
          {lang === "AR" ? "تكوين جدول" : "Create a timetable"}
        </Button>
        <Button
          className="previewer-btn d-block mx-auto mt-2"
          disabled={timeTable.length === 0}
          onClick={previewWorkbook}
        >
          {lang === "AR" ? "عرض الجدول" : "Preview timetable"}
        </Button>
      </div>
    </div>
  );
}

/**
 * The `rowCounter` function counts the number of enrolled students based on different criteria.
 * @returns The function `rowCounter` returns the value of the `count` variable.
 */
const rowCounter = (p1, p2, res, type) => {
  let count = 1;
  const deleted = [];
  const period = [...p1, ...p2];

  for (const subject of period) {
    for (const student of subject.enrolledStudents) {
      if (
        (type === "year" && !deleted.includes(subject.subjectCode) && student.year === res) ||
        (type === "dep" && !deleted.includes(subject.subjectCode) && student.dep === res) ||
        (type === "dep-year" &&
          !deleted.includes(subject.subjectCode) &&
          student.dep === res[0] &&
          student.year === res[1])
      ) {
        deleted.push(subject.subjectCode);
        count++;
      }
    }
  }

  return count;
};

/**
 * The function `checkCounter` checks if the finalWorkbook and finalSchedule arrays are empty and
 * displays a warning message if they are.
 * @returns The function `checkCounter` returns a boolean value. If either `finalWorkbook` or
 * `finalSchedule` is empty, the function returns `false`. Otherwise, it returns `true`.
 */
const checkCounter = (finalWorkbook, finalSchedule, msgMaker, lang) => {
  if (finalWorkbook.length === 0 || finalSchedule.length === 0) {
    msgMaker(
      "warning",
      finalWorkbook.length === 0
        ? lang === "AR"
          ? "عدد المقررات لا يمكن أن يكون صفر"
          : "Number of Subjects can't be empty"
        : lang === "AR"
        ? "مدة الامتحانات لا يمكن أن تكون صفر"
        : "Number of Schedule can't be empty"
    );
    return false;
  }
  return true;
};

/**
 * The function `searchPeriod` checks if a given condition is met for any enrolled student in a given
 * period.
 * @returns The function `searchPeriod` returns a boolean value.
 */
const searchPeriod = (period, res, type) => {
  switch (type) {
    case "dep":
      return period.some((p) => p.enrolledStudents.some((pe) => pe.dep === res));
    case "year":
      return period.some((p) => p.enrolledStudents.some((pe) => pe.year === res));
    case "dep-year":
      //res is an array in this scenario
      return period.some((p) => p.enrolledStudents.some((pe) => pe.dep === res[0] && pe.year === res[1]));
  }
};

/**
 * The function `getAllOptions` takes in a final workbook and a type (either "year" or "dep") and
 * returns a list of options based on the enrolled students in the workbook.
 * @returns a JSX fragment that contains a list of options. The options are generated based on the
 * input parameters `finalWorkbook` and `type`. The options are extracted from the `enrolledStudents`
 * array within each subject in `finalWorkbook`. If `type` is "year", the options will be the unique
 * values of the `year` property of each student. If `type`
 */
const getAllOptions = (finalWorkbook, type) => {
  const options = [];

  finalWorkbook.map((subject) => {
    subject.enrolledStudents.map((student) => {
      if (type === "year" && !options.includes(student.year)) options.push(student.year);
      else if (type === "dep" && !options.includes(student.dep)) options.push(student.dep);
    });
  });

  return (
    <>
      {options.map((option, oi) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <option key={oi} value={option}>
          {type === "year" ? `المستوى ${option}` : option}
        </option>
      ))}
    </>
  );
};

/**
 * The function assigns conflicted subjects to each student in a final workbook based on their
 * enrollment in different subjects.
 * @returns The function `eliminateConflicts` returns an arrow function.
 */
const eliminateConflicts = (finalWorkbook, setFinalWorkbook) => {
  for (const A of finalWorkbook) {
    for (const B of finalWorkbook) {
      if (A.subjectCode === B.subjectCode) continue;

      for (const as of A.enrolledStudents) {
        for (const bs of B.enrolledStudents) {
          if (as.id === bs.id && A.conflictedSubjects.every((c) => c !== B.subjectCode))
            A.conflictedSubjects.push(B.subjectCode);
        }
      }
    }
  }

  setFinalWorkbook(finalWorkbook);
};

/**
 * The function saves a table to local storage along with the current date and time in Arabic and
 * English formats.
 */
const saveTable = (table) => {
  if (!localStorage.getItem("savedTables")) localStorage.setItem("savedTables", JSON.stringify([]));

  const tempTables = JSON.parse(localStorage.getItem("savedTables"));
  tempTables.reverse();
  if (tempTables.length >= 15) tempTables.splice(0, 1);
  tempTables.push({
    content: table,
    dateAr: new Date().toLocaleString("ar").split("،"),
    dateEn: new Date().toLocaleString("en-GB").split(","),
  });
  tempTables.reverse();
  localStorage.setItem("savedTables", JSON.stringify(tempTables));
};

/**
 * The function `tableBuilder` creates a timetable based on provided workbook and schedule data, with
 * error handling and success message generation.
 * @returns An arrow function that, when called, will attempt to check the counter, assign periods, and
 * display a success message if successful or a warning message if an error occurs.
 */
function tableBuilder(finalWorkbook, finalSchedule, msgMaker, lang, setTimeTable, period) {
  return () => {
    try {
      if (!checkCounter(finalWorkbook, finalSchedule, msgMaker, lang)) return;

      periodAssigner(finalWorkbook, finalSchedule, setTimeTable, period);

      msgMaker("success", lang === "AR" ? "تم تكوين الجدول بنجاح" : "Timetable created successfully");
    } catch (err) {
      msgMaker("warning", lang === "AR" ? "خطأ اثناء تكوين الجدول" : "Error while creating the timetable");
    }
  };
}

/**
 * The function `periodAssigner` assigns subjects to periods in a timetable while avoiding conflicts
 * and eliminates empty days.
 */
const periodAssigner = (finalWorkbook, finalSchedule, setTimeTable, period) => {
  let tempTable = [];
  const deleted = [];
  for (const S of finalSchedule) {
    tempTable.push({ ...S, Period1: [], Period2: [] });
    for (const W of finalWorkbook) {
      if (deleted.includes(W.subjectCode)) continue;
      if (
        (+period === 1 || +period === 0) &&
        (tempTable[tempTable.length - 1].Period1.length === 0 ||
          !tempTable[tempTable.length - 1].Period1.some((s) => s.conflictedSubjects.includes(W.subjectCode)))
      ) {
        tempTable[tempTable.length - 1].Period1.push(W);
        deleted.push(W.subjectCode);
      } else if (
        (+period === 2 || +period === 0) &&
        (tempTable[tempTable.length - 1].Period2.length === 0 ||
          !tempTable[tempTable.length - 1].Period2.some((s) => s.conflictedSubjects.includes(W.subjectCode)))
      ) {
        tempTable[tempTable.length - 1].Period2.push(W);
        deleted.push(W.subjectCode);
      }
    }
  }

  //eliminate empty days
  tempTable = tempTable.filter((t) => {
    if (
      (+period === 1 && t.Period1.length !== 0) ||
      (+period === 2 && t.Period2.length !== 0) ||
      (+period === 0 && (t.Period1.length !== 0 || t.Period2.length !== 0))
    )
      return t;
  });
  setTimeTable(tempTable);

  saveTable(tempTable);
};
