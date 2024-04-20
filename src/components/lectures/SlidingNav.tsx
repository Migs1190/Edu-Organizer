import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext, useRef } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ContextData } from "../../App";
import { readSingleFile } from "../general/fileReader";
import type { WorkSheetMap } from "../../pages/AppLectures";

type SlidingNavType = {
	lecturesSection: React.RefObject<HTMLDivElement>;
	setLecWorkbook: (newMap: WorkSheetMap) => void;
};

const animateCommonProps = {
	duration: 500,
	easing: "ease-in-out",
	fill: "forwards" as FillMode,
};

const SlidingNav: FC<SlidingNavType> = ({
	lecturesSection,
	setLecWorkbook,
}) => {
	const nav = useRef<HTMLDivElement>(null);
	const { msgMaker, langOption, deleteMessage } = useContext(ContextData);

	const handleSlideOut = () => {
		lecturesSection.current?.animate([{ marginTop: "98px" }], {
			...animateCommonProps,
		});
		nav.current?.animate([{ left: "0" }], { ...animateCommonProps });
	};
	const handleSlideIn = () => {
		nav.current?.animate([{ left: "100%" }], {
			duration: 1000,
			easing: "ease-in-out",
			fill: "forwards",
		});
		lecturesSection.current?.animate([{ marginTop: "0" }], {
			...animateCommonProps,
		});
	};

	const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		//If no files are uploaded, return -- TypeScript
		if (e.target.files === null)
			return msgMaker("warning", "No files uploaded");
		const file = e.target.files[0];
		//Is the file an excel file
		if (!file.name.includes("xls") && !file.name.includes("xlsx")) {
			//No? Show a warning notification
			return msgMaker(
				"warning",
				langOption("امتداد ملف غير مدعوم", "Unsupported file extension"),
			);
		}

		msgMaker("loading", "Uploading file...", "lec");
		setLecWorkbook(await readSingleFile(file));
		deleteMessage("lec");
	};

	return (
		<Navbar
			id="floating-file-uploader"
			ref={nav}
			className="position-fixed w-100 my-3"
			bg="body-secondary"
			data-bs-theme="body-secondary"
		>
			<Container fluid>
				<Navbar.Brand href="#">Add File</Navbar.Brand>
				<Nav className="mx-auto d-flex gap-4">
					<Nav.Link
						as={Button}
						variant="link"
						className="d-none"
						href="#"
						disabled
					>
						{/* TODO Implement this */}
						Drive
					</Nav.Link>
					<Nav.Link
						className="position-relative cur-pointer"
						as={Button}
						variant="link"
						href="#"
					>
						<input
							className="bg-info position-absolute w-100 h-100 start-0 top-0 opacity-0 cur-pointer"
							type="file"
							accept=".xls, .xlsx"
							onChange={(e) => handleFile(e)}
						/>
						Local
					</Nav.Link>
				</Nav>
				<Navbar.Brand
					href="#"
					onClick={handleSlideIn}
					className="h-100 px-2 border-end border-1 position-absolute start-0  d-flex align-items-center"
				>
					<FontAwesomeIcon icon={faAnglesRight} />
				</Navbar.Brand>
			</Container>
			<Navbar.Brand
				href="#"
				id="arrow"
				onClick={handleSlideOut}
				className="bg-body-secondary border-1 h-100 px-2 rounded-start position-absolute d-flex align-items-center"
			>
				<FontAwesomeIcon icon={faAnglesLeft} />
			</Navbar.Brand>
		</Navbar>
	);
};
export default SlidingNav;
