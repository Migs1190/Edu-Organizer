import { useContext } from "react";
import { Table } from "react-bootstrap";
import { ContextData } from "../../../App";

export const ExcelModalContent = ({ template }) => {
  const { lang } = useContext(ContextData);
  return (
    <Table id="table" striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th>{lang === "AR" ? "اسم المقرر" : "Subject Name"}</th>
          <th className="text-center">{lang === "AR" ? "المستوى" : "Year"}</th>
          <th className="text-center">{lang === "AR" ? "الفصل" : "Semester"}</th>
          <th className="text-nowrap text-center">{lang === "AR" ? "كود المقرر" : "Subject Code"}</th>
          <th className="text-nowrap text-center">{lang === "AR" ? "أرقام الجلوس المسجلة" : "Student ID"}</th>
        </tr>
      </thead>
      <tbody>
        {template.map((S, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <tr key={index}>
            <td className="text-center">{index + 1}</td>
            <td className={lang === "AR" ? "ps-0" : "pe-0"}>{S.subjectName}</td>
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
