import React, { useContext, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { ContextData } from "../../App";

/* #region Constants */
const weeks = [
	{ ar: "أسبوع زوجي", en: "even" },
	{ ar: "أسبوع فردي", en: "odd" },
];
const days = [
	{ ar: "الخميس", en: "thu" },
	{ ar: "الأربعاء", en: "wed" },
	{ ar: "الثلاثاء", en: "tue" },
	{ ar: "الاثنين", en: "mon" },
	{ ar: "الأحد", en: "sun" },
	{ ar: "السبت", en: "sat" },
];
/* #endregion */

type Props = { setWeek: (week: string) => void; setDay: (day: string) => void };

const DashboardFilter = ({ setDay, setWeek }: Props) => {
	const { langOption } = useContext(ContextData);
	const [activeWeek, setActiveWeek] = useState("odd");
	const [activeDay, setActiveDay] = useState("sat");

	/* #region Functions */
	const activateDay = (name: string) => {
		setActiveDay(name);
		setDay(name);
	};
	const activateWeek = (name: string) => {
		setActiveWeek(name);
		setWeek(name);
	};
	/* #endregion */

	return (
		<Container className="mb-5 d-flex flex-column align-items-center gap-2 ">
			<ListGroup horizontal dir="ltr">
				{weeks.map((week) => (
					<ListGroup.Item className="cur-pointer" key={week.en} variant={week.en === activeWeek ? "primary" : ""} onClick={() => activateWeek(week.en)}>
						{langOption(week.ar, week.en)}
					</ListGroup.Item>
				))}
			</ListGroup>
			<ListGroup horizontal dir="ltr">
				{days.map((day) => (
					<ListGroup.Item className="cur-pointer" key={day.en} variant={day.en === activeDay ? "primary" : ""} onClick={() => activateDay(day.en)}>
						{langOption(day.ar, day.en)}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
};

export default DashboardFilter;
