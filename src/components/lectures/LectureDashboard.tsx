import React from "react";
import type { lectureDayType, lecturesTableType } from "./worksheetProcessor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import ClassCard from "./dashboard/ClassCard";
type Props = { LecWorksheet: lecturesTableType; day: string; week: string };

const LectureDashboard = React.memo(({ LecWorksheet, day, week }: Props) => {

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
					<ClassCard subject={lec.subject} code={lec.code} year={lec.year} department={lec.department} professor={lec.professor} />
				</div>
			))}
		</Container>
	);
});

export default LectureDashboard;
