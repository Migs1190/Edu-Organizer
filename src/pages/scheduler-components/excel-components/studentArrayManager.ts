import { utils } from "xlsx";
import { getCell, getSlices } from "./GetSheetData";
import type { MessageMaker, LangOption, Workbook } from "../../../App";
import type { SheetCollection, Sheet } from "../SchedulerExcel";

type SheetObject = {
  w: string;
};

type SliceData = {
  name: string;
  code: string;
  year: string;
  term: string;
};

type Students = {
  name: string;
  id: string;
  year: string;
  dep: string;
}[];

function processRow(
  row: number,
  currentSheet: Sheet,
  lastCol: string,
  detailsSheet: Sheet,
  subjectStudentsCount: number,
  enrolledStudents: Students
) {
  //Get the department and year of the sheet
  const tempDep: string[] = (
    detailsSheet[
      `${getCell(detailsSheet, "الشعبة", "include").col}${getCell(detailsSheet, "الشعبة", "include").row}`
    ] as SheetObject
  ).w.split("/");

  let tempYear: string[];
  //Try getting the year from the "المستوى" cell and use the "include" key because "المستوى" is in a sentence
  try {
    tempYear = (
      detailsSheet[
        `${getCell(detailsSheet, "المستوى", "include").col}${getCell(detailsSheet, "المستوى", "include").row}`
      ] as SheetObject
    ).w.split(" ");
    //If it fails, get the year from the "معادلة" cell and use the "include" key because "معادلة" is in a sentence
  } catch (Err) {
    console.error("Look in StudentArrayManager line 49", Err);
    tempYear = (
      detailsSheet[
        `${getCell(detailsSheet, "معادلة", "include").col}${getCell(detailsSheet, "معادلة", "include").row}`
      ] as SheetObject
    ).w.split(" ");
  }
  //Update subjectStudentsCount
  const newSubjectStudentsCount = subjectStudentsCount + 1;
  //Push the student's name, id, year and department to the enrolledStudents array
  enrolledStudents.push({
    name: (currentSheet[`${lastCol}${row}`] as SheetObject).w,
    id: (currentSheet[`${getCell(currentSheet, "رقم الجلوس").col}${row}`] as SheetObject).w,
    year: tempYear[1],
    dep: tempDep[tempDep.length - 1].includes("القسم")
      ? tempDep[tempDep.length - 1].split(":")[1]
      : tempDep[tempDep.length - 1],
  });
  //Return the updated subjectStudentsCount and enrolledStudents
  return { subjectStudentsCount: newSubjectStudentsCount, enrolledStudents };
}

function processFirstRow(value: SheetObject, tempOb: Workbook) {
  //Get the subject's name, code, year and term
  const slices: SliceData = getSlices(value.w);
  tempOb.subjectName = slices.name;
  tempOb.subjectCode = slices.code.toUpperCase();
  tempOb.subjectYear = slices.year;
  tempOb.subjectTerm = slices.term;
  tempOb.conflictedSubjects = [];
  return tempOb;
}

function studentArrayManager(setWorkbook, langOption: LangOption, msgMaker: MessageMaker) {
  return (sheet: SheetCollection, sType = "") => {
    //Initialize the different sheets
    const detailsSheet: Sheet = sheet.infoSheet;
    //If the the first sheet is not closed that means the second sheet is closed and the overflow key is sent
    const currentSheet = sType === "overflow" ? sheet.studentsSheet2 : sheet.studentsSheet1;
    //Execution
    try {
      //If the currentSheet is undefined, return a warning message -- Typescript
      if (currentSheet === undefined) return msgMaker("warning", langOption("الملف فارغ", "Empty file"));
      //Variables
      let subjectStudentsCount = 0;
      let enrolledStudents: Students = [];
      let tempOb = {} as Workbook;
      //Constants
      const tempAr: Workbook[] = [];
      //Get the first and last row and column
      const firstRow = getCell(currentSheet, "اسم الطالب").row + 1;
      const lastCol = getCell(currentSheet, "اسم الطالب").col;
      const decodedLastCol = utils.decode_col(lastCol);
      const lastRow = getCell(currentSheet, "عميد الكلية").row - 2;

      //Loop through the sheet's:
      //Columns
      for (let col = 0; col <= decodedLastCol; col++) {
        //Rows
        for (let row = firstRow; row <= lastRow; row++) {
          const currentCol = utils.encode_col(col);
          const currentHeader = currentSheet[`${currentCol}${firstRow}`];
          const address = currentCol + row;
          const value = currentSheet[`${address}`] as SheetObject;

          //If the currentHeader is undefined (the cell is empty), break the loop
          if (currentHeader === undefined) break;

          switch (row) {
            //Is it the first row?
            case firstRow:
              //Yes? then process the first row
              tempOb = processFirstRow(value, tempOb);
              break;
            //Is it the last row?
            case lastRow:
              //Yes? then wrap up tempOb and push it to tempAr
              //Also, reset tempOb, enrolledStudents and subjectStudentsCount
              tempOb.studentsCount = subjectStudentsCount;
              tempOb = { ...tempOb, enrolledStudents };
              tempAr.push(tempOb);
              tempOb = {} as Workbook;
              enrolledStudents = [];
              subjectStudentsCount = 0;
              break;
            //Is it none of the above? ie. a normal row
            default: {
              //Yes? then process the row
              //But first continue if the cell value is undefined
              if (value === undefined) continue;
              const result = processRow(
                row,
                currentSheet,
                lastCol,
                detailsSheet,
                subjectStudentsCount,
                enrolledStudents
              );
              //Update the subjectStudentsCount and enrolledStudents
              subjectStudentsCount = result.subjectStudentsCount;
              enrolledStudents = result.enrolledStudents;
              break;
            }
          }
        }
      }
      //Update the workbook and add the processed array of subjects
      setWorkbook((workbook) => [...workbook, ...tempAr]);
      //Is the last row 198? that's too high meaning it's an overflow
      //So call the function again with the overflow key
      if (lastRow === 200) studentArrayManager(setWorkbook, langOption, msgMaker)(sheet, "overflow");
    } catch (err) {
      //If an error occurred, log it and return a warning message
      console.error("Look in StudentArrayManager line 161", err);
      msgMaker("warning", langOption("حدث خطأ اثناء قراءة الملف", "Error while reading the file"));
    }
  };
}
export default studentArrayManager;
