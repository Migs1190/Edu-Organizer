import "../styles/AppHome.min.css";
import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

export default function AppHome({ lang }) {
  const header = useRef();
  const header1 = useRef();
  const line = useRef();
  const header2 = useRef();

  const animateHeaders = () => {
    header.current.animate(
      [
        {
          transform: "translate(0, -30%)",
        },
        { opacity: 1, transform: "translate(0, 0)" },
      ],
      {
        duration: 500,
        iterations: 1,
        fill: "forwards",
      }
    );
    header1.current.animate(
      [
        {
          transform: "translate(0, -30%)",
        },
        { opacity: 1, transform: "translate(0, 0)" },
      ],
      {
        duration: 1000,
        delay: 500,
        iterations: 1,
        fill: "forwards",
      }
    );
    line.current.animate([{}, { opacity: 1, width: "10rem" }], {
      duration: 500,
      delay: 1500,
      iterations: 1,
      fill: "forwards",
    });
    header2.current.animate(
      [
        {
          transform: "translate(0, 30%)",
        },
        { opacity: 1, transform: "translate(0, 0)" },
      ],
      {
        duration: 1000,
        delay: 2000,
        iterations: 1,
        fill: "forwards",
      }
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => animateHeaders(), []);

  return (
    <section id="home-section" className="nav-foot-spacing text-center">
      <Container>
        <div className="home-title">
          <h3 ref={header} className="text-secondary">
            {lang === "AR" ? "كلية العلوم" : "Faculty of Science"}
          </h3>
          <h2 ref={header1}>{lang === "AR" ? "جامعة طنطا" : "Tanta University"}</h2>
          <span ref={line} className="line mx-auto" />
          <h2 ref={header2} className="my-3">
            {lang === "AR" ? "منصة إدارة الجداول" : "Timetable Management System"}
          </h2>
        </div>
      </Container>
    </section>
  );
}
