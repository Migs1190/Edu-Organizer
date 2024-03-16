import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import "../styles/AppScheduler.min.css";
import SchedulerTabs from "./scheduler-components/SchedulerTabs";
import { ContextData } from "../App";

const AppScheduler = () => {
  const { lang } = useContext(ContextData);
  return (
    <Col sm={12}>
      <SchedulerTabs lang={lang} />
    </Col>
  );
};

export default AppScheduler;
