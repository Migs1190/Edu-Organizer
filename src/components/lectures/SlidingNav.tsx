import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext, useRef } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ContextData } from "../../App";

type SlidingNavType = {
	lecturesSection: React.RefObject<HTMLDivElement>;
	handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SlidingNav: FC<SlidingNavType> = ({ lecturesSection, handleFile }) => {
	const { langOption } = useContext(ContextData);
	const nav = useRef<HTMLDivElement>(null);

	const toggleSlide = (swtch: boolean) => {
		if (swtch) nav.current?.classList.add("active");
		else nav.current?.classList.remove("active");
	};

	return (
		<Navbar id="floating-file-uploader" ref={nav} className="position-absolute w-100 my-3 z-3 " bg="body-secondary" data-bs-theme="body-secondary">
			<Container fluid>
				<Navbar.Brand href="#">{langOption("إضافة جدول", "Add a table")}</Navbar.Brand>
				<Nav className="mx-auto d-flex gap-4">
					<Nav.Link as={Button} variant="link" href="#" disabled>
						{/* TODO Implement this */}
						<input className="bg-info position-absolute w-100 h-100 start-0 top-0 opacity-0 cur-pointer" type="file" accept=".xls, .xlsx" />
						OneDrive
					</Nav.Link>
					<Nav.Link className="position-relative" as={Button} variant="link" href="#">
						<input
							className="bg-info position-absolute w-100 h-100 start-0 top-0 opacity-0 cur-pointer"
							type="file"
							accept=".xls, .xlsx"
							onChange={handleFile}
						/>
						Local
					</Nav.Link>
				</Nav>
				<Navbar.Brand href="#" id="close-arrow" onClick={() => toggleSlide(false)} className="h-100 px-2 position-absolute d-flex align-items-center">
					<FontAwesomeIcon icon={langOption(faAnglesRight, faAnglesLeft)} />
				</Navbar.Brand>
			</Container>
			<Navbar.Brand
				href="#"
				id="open-arrow"
				onClick={() => toggleSlide(true)}
				className="bg-body-secondary h-100 px-2 position-absolute d-flex align-items-center z-3"
			>
				<FontAwesomeIcon icon={langOption(faAnglesLeft, faAnglesRight)} />
			</Navbar.Brand>
		</Navbar>
	);
};
export default SlidingNav;
