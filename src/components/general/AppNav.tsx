import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextData } from "../../App";
import "../../sass/MainNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function AppNav() {
	const { lang, langOption, setLang } = useContext(ContextData);

	function changeLang() {
		if (localStorage.getItem("lang") === "AR") {
			setLang("EN");
			localStorage.setItem("lang", "EN");
		} else {
			setLang("AR");
			localStorage.setItem("lang", "AR");
		}
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.documentElement.dir = langOption("rtl", "ltr");
	}, [lang]);

	return (
		<Navbar collapseOnSelect variant="dark" id="main-nav" expand="lg">
			<Container className="px-nav-container" fluid>
				<Navbar.Brand className="m-0 mb-4 mb-md-0">
					<a className="logo-link" href="https://sci.tanta.edu.eg/">
						<img
							className="logo ms-2 "
							alt="Faculty of science"
							src="/sci.png"
							draggable="false"
						/>
					</a>
					<span className="mx-2 text-light ">|</span>
					<a className="logo-link" href="https://tanta.edu.eg/">
						<img
							className="logo"
							alt="Tanta University"
							src="/uni.png"
							draggable="false"
						/>
					</a>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Nav.Link as={Link} to="/">
							<span className="lined-nav-link pb-1">
								{langOption("الرئيسية", "Home")}
							</span>
						</Nav.Link>
						<div className="position-relative ">
							<Nav.Link className="nav-link-drop-btn" as={Link} to="#">
								<span className="lined-nav-link pb-1">
									{langOption("الاختبارات", "Exams")}
								</span>
							</Nav.Link>
							<div className="nav-link-dropdown text-md-center">
								<Nav.Link as={Link} to="scheduler">
									<span className="lined-nav-link pb-1 text-nowrap ">
										{langOption("جدول جديد", "Schedule a table")}
									</span>
								</Nav.Link>
								<Nav.Link as={Link} to="reviewer">
									<span className="lined-nav-link pb-1 text-nowrap ">
										{langOption("مراجعة الجداول", "Review Timetables")}
									</span>
								</Nav.Link>
							</div>
						</div>
						<div className="position-relative">
							<Nav.Link className="nav-link-drop-btn" as={Link} to="#">
								<span className="lined-nav-link pb-1">
									{langOption("المحاضرات", "Lectures")}
								</span>
							</Nav.Link>
							<div className="nav-link-dropdown text-md-center">
								<Nav.Link as={Link} to="/classrooms">
									<span className="lined-nav-link pb-1 text-nowrap ">
										{langOption("متابعة جداول المحاضرات", "Classroom Overview")}
									</span>
								</Nav.Link>
							</div>
						</div>
					</Nav>
					<Navbar.Brand
						className="m-0 p-0 d-inline-block"
						onClick={changeLang}
						href="#"
					>
						<div className="lang-icon-frame nav-link lined-nav-link mt-2">
							<FontAwesomeIcon className="lang-icon" icon={faGlobe} />
							<span className="lang-text">{lang}</span>
						</div>
					</Navbar.Brand>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
