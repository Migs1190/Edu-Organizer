import { utils } from "xlsx";
import { getCol, getRow, getSlices } from "./GetSheetData";

function studentArrayManager(setWorkbook, lang, msgMaker) {
  return (sheet, sType = "") => {
    //Initialization
    const sheet0 = sheet.infoSheet;
    /*Set the current sheet
	Sheet1 or sheet2 in case of OVERFLOW*/
    const currentSheet = sType === "overflow" ? sheet.studentsSheet2 : sheet.studentsSheet1;

    //Execution
    try {
      let subjectStudentsCount = 0;
      let enrolledStudents = [];
      let tempOb = {};
      const tempAr = [];
      const firstRow = +getRow(currentSheet, "اسم الطالب") + 1;
      const lastCol = getCol(currentSheet, "اسم الطالب");
      //Columns are decoded because they're represented by letters
      const decodedLastCol = utils.decode_col(lastCol);
      const lastRow = getRow(currentSheet, "عميد الكلية") - 2;
      for (let col = 0; col <= decodedLastCol; col++) {
        for (let row = firstRow; row <= lastRow; row++) {
          const currentCol = utils.encode_col(col);
          const currentHeader = currentSheet[`${currentCol}${firstRow}`];
          const address = currentCol + row;
          const value = currentSheet[`${address}`];

          if (currentHeader === undefined) break;

          switch (row) {
            case lastRow:
              //Last Row
              tempOb.studentsCount = subjectStudentsCount;
              tempOb = { ...tempOb, enrolledStudents };
              tempAr.push(tempOb);
              tempOb = {};
              enrolledStudents = [];
              subjectStudentsCount = 0;
              break;
            case firstRow: {
              //First Row (Subjects)
              const slices = getSlices(value.w);
              if (slices !== "invalid") {
                tempOb.subjectName = slices.name;
                tempOb.subjectCode = slices.code.toUpperCase();
                tempOb.subjectYear = slices.year;
                tempOb.subjectTerm = slices.term;
                tempOb.conflictedSubjects = [];
              }
              break;
            }
            default: {
              if (value === undefined) continue;
              const tempDep =
                sheet0[`${getCol(sheet0, "الشعبة", "include")}${getRow(sheet0, "الشعبة", "include")}`].w.split("/");

              let tempYear;
              try {
                tempYear =
                  sheet0[`${getCol(sheet0, "المستوى", "include")}${getRow(sheet0, "المستوى", "include")}`].w.split(" ");
              } catch (Err) {
                tempYear =
                  sheet0[`${getCol(sheet0, "معادلة", "include")}${getRow(sheet0, "معادلة", "include")}`].w.split(" ");
              }

              enrolledStudents.push({
                name: currentSheet[`${lastCol}${row}`].w,
                id: currentSheet[`${getCol(currentSheet, "رقم الجلوس")}${row}`].w,
                year: tempYear[1],
                dep: tempDep[tempDep.length - 1].includes("القسم")
                  ? tempDep[tempDep.length - 1].split(":")[1]
                  : tempDep[tempDep.length - 1],
              });
              subjectStudentsCount++;
              break;
            }
          }
        }
      }
      setWorkbook((workbook) => [...workbook, ...tempAr]);
      //If there's no last row in the current sheet send overflow flag and look in the next sheet
      if (lastRow === 198) studentArrayManager(sheet, "overflow");
    } catch (err) {
      console.error(err);
      msgMaker("warning", lang === "AR" ? "حدث خطأ اثناء قراءة الملف" : "Error while reading the file");
    }
  };
}
export default studentArrayManager;
