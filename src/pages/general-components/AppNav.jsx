import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import uniLogo from "/uni.png";
import collegeLogo from "/sci.png";
import { ContextData } from "../../App";
import "../../styles/MainNav.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function AppNav() {
  const { lang, langOption, setLang } = useContext(ContextData);
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);

  const showDrop1 = () => setShowDropDown1(true);
  const hideDrop1 = () => setShowDropDown1(false);

  const showDrop2 = () => setShowDropDown2(true);
  const hideDrop2 = () => setShowDropDown2(false);

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
    <Navbar collapseOnSelect variant="dark" id="main-nav" expand="md">
      <Container className="px-nav-container" fluid>
        <Navbar.Brand className="m-0 mb-4 mb-md-0">
          <a className="logo-link" href="https://sci.tanta.edu.eg/">
            <img className="logo ms-2 " alt="Faculty of science" src={collegeLogo} draggable="false" />
          </a>
          <span className="mx-2 text-light ">|</span>
          <a className="logo-link" href="https://tanta.edu.eg/">
            <img className="logo" alt="Tanta University" src={uniLogo} draggable="false" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className="nav-link lined-nav-link flnl" as={Link} to="/">
              {langOption("الرئيسية", "Home")}
            </Nav.Link>
            <NavDropdown
              menuVariant="secondary"
              renderMenuOnMount
              show={showDropDown1}
              onMouseEnter={showDrop1}
              onMouseLeave={hideDrop1}
              title={langOption("الاختبارات", "Exams")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className="text-center nav-link lined-nav-link" as={Link} to="scheduler">
                {langOption("جدول جديد", "Schedule a table")}
              </NavDropdown.Item>
              <br />
              <NavDropdown.Item className="text-center nav-link lined-nav-link" as={Link} to="reviewer">
                {langOption("مراجعة الجداول", "Review Timetables")}
              </NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown
              menuVariant="secondary"
              renderMenuOnMount
              show={showDropDown2}
              onMouseEnter={showDrop2}
              onMouseLeave={hideDrop2}
              title={langOption("القاعات", "Halls")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className="text-center nav-link lined-nav-link" as={Link} to="scheduler">
                {langOption("جدول جديد", "Schedule a table")}
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Navbar.Brand className="m-0 p-0" onClick={changeLang} href="#" title="hey">
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
