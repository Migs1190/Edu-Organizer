// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { ContextData } from "../../App";
import type { SavedTimeTable, TimeTable } from "../../types";

type TableCardsType = {
	previewModal: () => void;
	setTemplate: React.Dispatch<React.SetStateAction<TimeTable[]>>;
};

const TableCards: FC<TableCardsType> = ({ previewModal, setTemplate }) => {
	const [timetables, setTimetables] = useState<SavedTimeTable[]>(
		JSON.parse(localStorage.getItem("savedTables") as string),
	);
	const { langOption } = useContext(ContextData);
	return (
		<>
			{timetables !== null && timetables.length !== 0 ? (
				timetables.map((table, ti) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<Card bg="light" className="tables-card mb-3 mx-auto " key={ti}>
						<Card.Body className="d-flex justify-content-between align-items-center">
							<div>
								{langOption("التاريخ: ", "Date: ")}
								<Badge bg="secondary">
									{langOption(table.dateAr[0], table.dateEn[0])}
								</Badge>
								<br />
								{langOption("الوقت: ", "Time: ")}
								<Badge bg="secondary">
									{langOption(table.dateAr[1], table.dateEn[1])}
								</Badge>
							</div>
							<div>
								<Button
									className="btn-sm mx-1"
									onClick={() => {
										previewModal();
										setTemplate(table.content);
									}}
								>
									{langOption("عرض", "Preview")}
								</Button>
								<Button
									className="btn-sm"
									onClick={() => deleteCard(setTimetables, ti)}
									variant="danger"
								>
									{langOption("حذف", "Delete")}
								</Button>
							</div>
						</Card.Body>
					</Card>
				))
			) : (
				<Card className="no-tables-card" bg="danger-subtle">
					<Card.Body>
						{langOption("لا يوجد جداول محفوظة", "No Saved timetables")}
					</Card.Body>
				</Card>
			)}
		</>
	);
};

type DeleteCardType = (
	setTimetables: React.Dispatch<React.SetStateAction<SavedTimeTable[]>>,
	index: number,
) => void;

const deleteCard: DeleteCardType = (setTimetables, index) => {
	const temp = JSON.parse(localStorage.getItem("savedTables") as string);
	temp.splice(index, 1);
	localStorage.setItem("savedTables", JSON.stringify(temp));
	setTimetables(JSON.parse(localStorage.getItem("savedTables") as string));
};

export default TableCards;
