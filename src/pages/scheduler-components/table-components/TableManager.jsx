import React from "react";

export const rowCounter = (p1, p2, res, type) => {
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

export const checkCounter = (finalWorkbook, finalSchedule, msgMaker, langOption) => {
  if (finalWorkbook.length === 0 || finalSchedule.length === 0) {
    msgMaker(
      "warning",
      finalWorkbook.length === 0
        ? langOption("عدد المقررات لا يمكن أن يكون صفر", "Number of Subjects can't be empty")
        : langOption("مدة الامتحانات لا يمكن أن تكون صفر", "Number of Schedule can't be empty")
    );
    return false;
  }
  return true;
};
export const searchPeriod = (period, res, type) => {
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
export const getAllOptions = (finalWorkbook, type) => {
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
export const eliminateConflicts = (finalWorkbook, setFinalWorkbook) => {
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

export const periodAssigner = (finalWorkbook, finalSchedule, setTimeTable, period) => {
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
