import { utils } from "xlsx";
import type { WorkSheetMap } from "../../pages/AppLectures";

export type Week = "odd" | "even";
export type Day = "sat" | "sun" | "mon" | "tue" | "wed" | "thu";

export type lectureDayType = {
 id: string;
 classroom: string;
 period: string;
 subject: string;
 code: string;
 professor: string;
 department: string;
 releventDep: string;
 year: string;
 empty?: boolean;
};

export type lecturesTableType = {
 [key: string]: {
  sat: lectureDayType[];
  sun: lectureDayType[];
  mon: lectureDayType[];
  tue: lectureDayType[];
  wed: lectureDayType[];
  thu: lectureDayType[];
 };
} & {
 [key: string]: {
  sat: lectureDayType[];
  sun: lectureDayType[];
  mon: lectureDayType[];
  tue: lectureDayType[];
  wed: lectureDayType[];
  thu: lectureDayType[];
 };
};

export const lecWorksheetProcessor = (worksheet: WorkSheetMap) => {
 if (worksheet.size === 0) return;

 const lectureTable = {
  odd: {
   sat: [] as lectureDayType[],
   sun: [] as lectureDayType[],
   mon: [] as lectureDayType[],
   tue: [] as lectureDayType[],
   wed: [] as lectureDayType[],
   thu: [] as lectureDayType[],
  },
  even: {
   sat: [] as lectureDayType[],
   sun: [] as lectureDayType[],
   mon: [] as lectureDayType[],
   tue: [] as lectureDayType[],
   wed: [] as lectureDayType[],
   thu: [] as lectureDayType[],
  },
 };

 let currentWeek: Week = "even";
 let currentDay: Day = "sat";
 let currentPeriod = "";
 let currentClassroom = "";
 let currentDep = "";
 const tempObj = {} as lectureDayType;
 let counter = 0; //Counter to keep track of the 5 rows of classroom data

 for (const [k, v] of worksheet) {
  const currentCol = utils.decode_cell(k).c; //Number
  const currentEncRow = utils.encode_row(utils.decode_cell(k).r); //String
  const currentRow = utils.decode_cell(k).r; //Number
  const currentVal = v.v as string;

  if (k === "AN244") currentWeek = "odd";

  if (
   currentRow < 3 ||
   currentCol < utils.decode_col("E") ||
   (currentCol > utils.decode_col("AD") && currentCol < utils.decode_col("AQ")) ||
   currentCol > utils.decode_col("BP")
  )
   continue; //Skip the first 3 rows and the first 5 columns and the empty columns in the middle and end of the sheet (either empty or not needed)

  //Is the current column an odd number? (classroom data is in odd columns)
  if (currentCol % 2 !== 0) {
   //Is the pointer on a cell in the same row as a day cell?
   if (worksheet.get(`C${currentEncRow}`)?.v !== "empty") {
    //Yes? then assign the current classroom
    currentClassroom = worksheet.get(`${getShiftedValue(currentCol, "col", -1)}3`)?.v as string;
    //and assign the current day
    currentDay = worksheet.get(`C${currentEncRow}`)?.v as string as Day;
    //Convert the day name to a short form
    switch (currentDay.trim()) {
     case "السبت":
     case "الســـــــــــــــــــــــــــــــــــــــــــــــبـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــت":
      currentDay = "sat";
      break;
     case "الأحد":
     case "الاحد":
      currentDay = "sun";
      break;
     case "الاثنين":
      currentDay = "mon";
      break;
     case "الثلاثاء":
      currentDay = "tue";
      break;
     case "الأربعاء":
     case "الاربعاء":
      currentDay = "wed";
      break;
     case "الخميس":
      currentDay = "thu";
      break;
     default:
      throw new Error("Invalid day name");
    }
    //Assign the classroom to the current lecture object
    tempObj.classroom = currentClassroom;
   }

   //Is the pointer on a cell in the same row as a period cell?
   if (worksheet.get(`D${currentEncRow}`)?.v !== "empty") counter = 0; //yes? reset the counter

   switch (counter) {
    case 0: //The first row of classroom data
     //get the period and department from the same row
     currentPeriod = worksheet.get(`D${currentEncRow}`)?.v as string;
     currentDep = worksheet.get(`${getShiftedValue(currentCol, "col", -1)}${currentEncRow}`)?.v as string;
     //Assign the period and department to the current lecture object
     tempObj.period = currentPeriod;
     tempObj.department = currentDep;
     tempObj.year = currentVal;
     break;
    case 1: //The second row of classroom data
     //Assign the relevant department to the current lecture object
     tempObj.releventDep = currentVal;
     break;
    case 2: //The third row of classroom data
     //Assign the subject code to the current lecture object
     tempObj.code = currentVal;
     break;
    case 3: //The fourth row of classroom data
     tempObj.subject = currentVal;
     break;
    case 4: //The fifth and last row of classroom data
     //Assign the professor to the current lecture object
     tempObj.professor = currentVal;
     tempObj.id = crypto.randomUUID();
     //Wrap up the current lecture object and push it to the lecture table

     lectureTable[currentWeek][currentDay].push({ ...tempObj });
     break;
   }
   counter++;
  }
 }
 return lectureTable;
};

const getShiftedValue = (value: number, type: "row" | "col", shift: number) => {
 return type === "row" ? utils.encode_row(value + shift) : utils.encode_col(value + shift);
};
