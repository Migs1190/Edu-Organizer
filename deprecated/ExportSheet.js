import { utils, writeFile } from "xlsx";

/**
 * The ExportSheet function takes a timetable as input, prompts the user for a file name, and then
 * generates an Excel file with the timetable data.
 * @param timeTable - The `timeTable` parameter is an array of objects representing the timetable. Each
 * object in the array represents a day and contains the following properties:
 * @returns The function does not explicitly return anything.
 */
const ExportSheet = (timeTable) => {
  const fileName = prompt("أدخل اسم الملف");
  if (fileName == null) return;
  const tempSheet = [];

  for (const day of timeTable) {
    for (const subject of day.Period1) {
      for (const student of subject.enrolledStudents) {
        tempSheet.push({
          "عدد الطلاب": subject.enrolledStudents.length,
          الفترة: "12 : 10",
          التاريخ: day.fullDate.ar,
          اليوم: day.day.ar,
          "اسم المقرر": subject.subjectName,
          "كود المقرر": subject.subjectCode,
          الشعبة: student.dep,
          المستوى: subject.subjectYear,
        });
      }
    }

    for (const subject of day.Period2) {
      for (const student of subject.enrolledStudents) {
        tempSheet.push({
          "عدد الطلاب": subject.enrolledStudents.length,
          الفترة: "3 : 1",
          التاريخ: day.fullDate.ar,
          اليوم: day.day.ar,
          "اسم المقرر": subject.subjectName,
          "كود المقرر": subject.subjectCode,
          الشعبة: student.dep,
          المستوى: subject.subjectYear,
        });
      }
    }
  }

  //eliminate duplicates
  const cleanedSheet = [];
  const deleted = [];
  for (const subject of tempSheet) {
    if (!deleted.includes(JSON.stringify(subject))) {
      cleanedSheet.push(subject);
      deleted.push(JSON.stringify(subject));
    }
  }

  const wb = utils.book_new();

  const ws = utils.json_to_sheet(cleanedSheet);
  utils.book_append_sheet(wb, ws, "timetable");

  //Create a new Excel file with the timetable data
  //If the user doesn't enter a file name, the file will be named "timetable"
  writeFile(wb, `${fileName || "timetable"}.xlsx`);
};
export default ExportSheet;
