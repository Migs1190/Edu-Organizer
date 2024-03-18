import { utils, writeFile } from "xlsx";

/**
 * The ExportSheet function takes a timetable as input, prompts the user for a file name, and then
 * generates an Excel file with the timetable data.
 * @param timeTable - The `timeTable` parameter is an array of objects representing the timetable. Each
 * object in the array represents a day and contains the following properties:
 * @returns The function does not explicitly return anything.
 */
interface TimeTable {
  fullDate: { ar: string };
  day: { ar: string };
  Period1: Subject[];
  Period2: Subject[];
}

interface Subject {
  enrolledStudents: Student[];
  subjectName: string;
  subjectCode: string;
  subjectYear: string;
}

interface Student {
  dep: string;
}

type CombinedSheet = {
  "عدد الطلاب": number;
  الفترة: string;
  التاريخ: string;
  اليوم: string;
  "اسم المقرر": string;
  "كود المقرر": string;
  الشعبة: string;
  المستوى: string;
}[];

const ExportSheet = (timeTable: TimeTable[]): void => {
  const fileName = prompt("أدخل اسم الملف");
  if (fileName == null) return;

  const tempSheet: CombinedSheet = [];

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
  const cleanedSheet: CombinedSheet = [];
  const deleted: string[] = [];
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
