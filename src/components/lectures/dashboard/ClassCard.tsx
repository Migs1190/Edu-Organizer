import React, { useContext } from "react";
import { ContextData } from "../../../App";
import { ListGroup } from "react-bootstrap";

type Props = { subject: string; code: string; year: string; department: string; professor: string };

const ClassCard = (props: Props) => {
	const { langOption } = useContext(ContextData);

	return (
		<div className="class-card-details">
			<ListGroup className="text-center d-flex w-100 " horizontal dir="ltr">
				<ListGroup.Item className="kofi flex-grow-1" variant="primary">
					{props.subject !== "empty" && props.subject}
				</ListGroup.Item>
				<ListGroup.Item className="list-title">{langOption("اسم المادة", "Subject Name")}</ListGroup.Item>
			</ListGroup>
			<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
				<ListGroup.Item className="kofi flex-grow-1 " variant="primary">
					{props.code !== "empty" && props.code}
				</ListGroup.Item>
				<ListGroup.Item className="list-title">{langOption("كود المادة", "Subject Code")}</ListGroup.Item>
			</ListGroup>
			<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
				<ListGroup.Item className="kofi flex-grow-1 " variant="primary">
					{props.year !== "empty" && props.year}
				</ListGroup.Item>
				<ListGroup.Item className="list-title">{langOption("العام الدراسي", "Year")}</ListGroup.Item>
			</ListGroup>
			<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
				<ListGroup.Item className="kofi flex-grow-1 " variant="primary">
					{props.department !== "empty" && props.department}
				</ListGroup.Item>
				<ListGroup.Item className="list-title">{langOption("الشعب", "Department(s)")}</ListGroup.Item>
			</ListGroup>
			<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
				<ListGroup.Item className="kofi flex-grow-1 " variant="primary">
					{props.professor !== "empty" && props.professor}
				</ListGroup.Item>
				<ListGroup.Item className="list-title">{langOption("المحاضر", "Professor(s)")}</ListGroup.Item>
			</ListGroup>
		</div>
	);
};
export default ClassCard;