import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ContextData } from "../../../App";

const TableCounter = () => {
	const { langOption, finalSchedule, finalWorkbook } = useContext(ContextData);
	return (
		<Table className="mx-auto" striped bordered hover size="sm" responsive>
			<tbody>
				<tr>
					<td>{langOption("المقررات المرفوعة", "Number of subjects")}</td>
					<td className="text-center">{finalWorkbook.length}</td>
				</tr>
        <tr>
					<td>{langOption("عدد الأيام المطلوبة", "Least amount of days needed")}</td>
					<td className="text-center">X</td>
				</tr>
        <tr>
          <td>{langOption('عدد الأيام المدخلة', 'Number of entered days')}</td>
          <td className="text-center">
            {finalSchedule.length} {langOption('يوم', 'days')}
          </td>
        </tr>
			</tbody>
		</Table>
	);
};

export default TableCounter;
