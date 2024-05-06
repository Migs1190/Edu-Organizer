import React, { useContext } from "react";
import { Container, Form } from "react-bootstrap";
import { ContextData } from "../../App";
import type { Day, Week, lecturesTableType } from "./worksheetProcessor";

/* #region Constants */
const weeks = [
 { ar: "أسبوع زوجي", en: "even" },
 { ar: "أسبوع فردي", en: "odd" },
];
const days = [
 { ar: "السبت", en: "sat" },
 { ar: "الأحد", en: "sun" },
 { ar: "الاثنين", en: "mon" },
 { ar: "الثلاثاء", en: "tue" },
 { ar: "الأربعاء", en: "wed" },
 { ar: "الخميس", en: "thu" },
];
/* #endregion */

type Props = { LecWorksheet: lecturesTableType; setWeek: (week: Week) => void; setDay: (day: Day) => void; setClassroom: (classroom: string) => void };

const DashboardFilter = ({ LecWorksheet, setDay, setWeek, setClassroom }: Props) => {
 const { langOption } = useContext(ContextData);
 const classrooms = [...new Set(LecWorksheet.odd.sat.map((lec) => lec.classroom))];
 return (
  <Container className="mb-5 d-flex align-items-center gap-2 ">
   <Form.Select onChange={(e) => setClassroom(e.target.value === "all" ? "" : e.target.value)} defaultValue="all">
    <option value="all">{langOption("جميع القاعات", "All Classrooms")}</option>
    {classrooms.map((classroom) => (
     <option key={classroom} value={classroom}>
      {classroom}
     </option>
    ))}
   </Form.Select>
   <Form.Select onChange={(e) => setWeek(e.target.value as Week)} defaultValue="odd">
    {weeks.map((week) => (
     <option key={week.en} value={week.en}>
      {langOption(week.ar, week.en)}
     </option>
    ))}
   </Form.Select>
   <Form.Select onChange={(e) => setDay(e.target.value as Day)} defaultValue="sat">
    {days.map((day) => (
     <option key={day.en} value={day.en}>
      {langOption(day.ar, day.en)}
     </option>
    ))}
   </Form.Select>
  </Container>
 );
};

export default DashboardFilter;
