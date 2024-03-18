import "../styles/AppHome.min.css";
import React, { useContext, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { ContextData } from "../App";

export default function AppHome() {
  const { langOption } = useContext(ContextData);
  const header = useRef();
  const header1 = useRef();
  const line = useRef();
  const header2 = useRef();

  // Animation properties
  const animationProps = {
    duration: 1000,
    iterations: 1,
    fill: "forwards",
  };

  const animateHeaders = () => {
    header.current.animate([{ transform: "translate(0, -30%)" }, { opacity: 1, transform: "translate(0, 0)" }], {
      ...animationProps,
      duration: 500,
    });

    header1.current.animate([{ transform: "translate(0, -30%)" }, { opacity: 1, transform: "translate(0, 0)" }], {
      ...animationProps,
      delay: 500,
    });

    line.current.animate([{}, { opacity: 1, width: "10rem" }], {
      ...animationProps,
      duration: 500,
      delay: 1500,
    });

    header2.current.animate([{ transform: "translate(0, 30%)" }, { opacity: 1, transform: "translate(0, 0)" }], {
      ...animationProps,
      delay: 2000,
    });
  };

  // Animate headers on component mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => animateHeaders(), []);

  return (
    <section id="home-section" className="text-center">
      <Container>
        <div>
          <h3 ref={header} className="text-secondary">
            {langOption("كلية العلوم", "Faculty of Science")}
          </h3>
          <h2 ref={header1}>{langOption("جامعة طنطا", "Tanta University")}</h2>
          <span ref={line} className="line mx-auto" />
          <h2 ref={header2} className="my-3">
            {langOption("منصة إدارة الجداول", "Timetable Management System")}
          </h2>
        </div>
      </Container>
    </section>
  );
}
