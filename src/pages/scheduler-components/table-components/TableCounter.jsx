import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ContextData } from "../../../App";

export const TableCounter = () => {
  const { lang, finalSchedule, finalWorkbook } = useContext(ContextData);
  return (
    <Table className="counter-table mx-auto" striped bordered hover size="sm" responsive>
      <tbody>
        <tr>
          <td>{lang === "AR" ? "المقررات المرفوعة" : "Number of subjects"}</td>
          <td className="text-center">{finalWorkbook.length}</td>
        </tr>
        <tr>
          <td>{lang === "AR" ? "مدة الامتحانات" : "Exam range"}</td>
          <td className="text-center">
            {finalSchedule.length} {lang === "AR" ? "يوم" : "days"}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
