import "../sass/AppHome.scss";
import React, { useContext, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { ContextData } from "../App";

export default function AppHome() {
  const { langOption } = useContext(ContextData);
  const header = useRef<HTMLHeadingElement>(null);
  const header1 = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const header2 = useRef<HTMLHeadingElement>(null);

  // Animation properties
  const animationProps = {
    duration: 1000,
    iterations: 1,
    fill: "forwards" as FillMode,
  };

  const animateHeaders = () => {
    if (header.current) {
      header.current.animate([{ transform: "translate(0, -30%)" }, { opacity: 1, transform: "translate(0, 0)" }], {
        ...animationProps,
        duration: 500,
      });
    }

    if (header1.current) {
      header1.current.animate([{ transform: "translate(0, -30%)" }, { opacity: 1, transform: "translate(0, 0)" }], {
        ...animationProps,
        delay: 500,
      });
    }

    if (line.current) {
      line.current.animate([{}, { opacity: 1, width: "10rem" }], {
        ...animationProps,
        duration: 500,
        delay: 1500,
      });
    }

    if (header2.current) {
      header2.current.animate([{ transform: "translate(0, 30%)" }, { opacity: 1, transform: "translate(0, 0)" }], {
        ...animationProps,
        delay: 2000,
      });
    }
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
