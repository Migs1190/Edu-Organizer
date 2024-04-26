import React, { useContext } from "react";
import type { lectureDayType, lecturesTableType } from "./worksheetProcessor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, ListGroup } from "react-bootstrap";
import { ContextData } from "../../App";
type Props = { LecWorksheet: lecturesTableType; day: string; week: string };

const LectureDashboard = React.memo(({ LecWorksheet, day, week }: Props) => {
	const { langOption } = useContext(ContextData);

	return (
		<Container fluid id="class-card-wrapper">
			{LecWorksheet[week][day].map((lec: lectureDayType) => (
				<div key={lec.id} className="class-card p-1 rounded border bg-primary bg-opacity-10">
					<div className="position-relative text-center">
						{lec.classroom}
						<span
							className={`class-state position-absolute ${lec.code === "empty" ? "text-warning" : "text-success"}`}
							title={lec.code === "empty" ? "Free" : "Busy"}
						>
							<FontAwesomeIcon icon={faCircle} size="sm" />
						</span>
						<div className="card-period text-secondary">{lec.period}</div>
						<hr />
					</div>
					<div className="class-card-details">
						<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
							<ListGroup.Item className="kofi" variant="primary">
								{lec.subject !== "empty" && lec.subject}
							</ListGroup.Item>
							<ListGroup.Item>{langOption("اسم المادة", "Subject Name")}</ListGroup.Item>
						</ListGroup>
						<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
							<ListGroup.Item className="kofi" variant="primary">
								{lec.code !== "empty" && lec.code}
							</ListGroup.Item>
							<ListGroup.Item>{langOption("كود المادة", "Subject Code")}</ListGroup.Item>
						</ListGroup>
						<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
							<ListGroup.Item className="kofi" variant="primary">
								{lec.year !== "empty" && lec.year}
							</ListGroup.Item>
							<ListGroup.Item>{langOption("العام الدراسي", "Year")}</ListGroup.Item>
						</ListGroup>
						<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
							<ListGroup.Item className="kofi" variant="primary">
								{lec.department !== "empty" && lec.department}
							</ListGroup.Item>
							<ListGroup.Item>{langOption("الشعب", "Department(s)")}</ListGroup.Item>
						</ListGroup>
						<ListGroup className="justify-content-end text-center" horizontal dir="ltr">
							<ListGroup.Item className="kofi" variant="primary">
								{lec.professor !== "empty" && lec.professor}
							</ListGroup.Item>
							<ListGroup.Item>{langOption("المحاضر", "Professor(s)")}</ListGroup.Item>
						</ListGroup>
					</div>
				</div>
			))}
		</Container>
	);
});

export default LectureDashboard;
