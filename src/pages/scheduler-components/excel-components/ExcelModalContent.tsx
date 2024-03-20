// biome-ignore lint/style/useImportType: <explanation>
import React, { FC } from "react";
import { useContext } from "react";
import { Table } from "react-bootstrap";
import { ContextData } from "../../../App";
import type { Workbook } from "../../../App";
/*
Contents:
 - The excel sheet content that is displayed in the modal
*/

type ExcelModalContentType = {
  template: Workbook[];
};

export const ExcelModalContent: FC<ExcelModalContentType> = ({ template }) => {
  const { langOption } = useContext(ContextData);
  return (
    <Table id="table" striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th>{langOption("اسم المقرر", "Subject Name")}</th>
          <th className="text-center">{langOption("المستوى", "Year")}</th>
          <th className="text-center">{langOption("الفصل", "Semester")}</th>
          <th className="text-nowrap text-center">{langOption("كود المقرر", "Subject Code")}</th>
          <th className="text-nowrap text-center">{langOption("أرقام الجلوس المسجلة", "Student ID")}</th>
        </tr>
      </thead>
      <tbody>
        {template.map((S, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <tr key={index}>
            <td className="text-center">{index + 1}</td>
            <td className={langOption("ps-0", "pe-0")}>{S.subjectName}</td>
            <td className="text-nowrap text-center">{S.subjectYear}</td>
            <td className="text-nowrap text-center">{S.subjectTerm}</td>
            <td className="text-nowrap text-center">{S.subjectCode}</td>
            <td>
              {S.enrolledStudents.map((e, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div className="text-nowrap text-center" key={index}>
                  {e.id}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
