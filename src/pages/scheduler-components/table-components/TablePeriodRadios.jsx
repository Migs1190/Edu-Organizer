import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { ContextData } from "../../../App";
export const TablePeriodRadios = ({ setPeriod }) => {
  const { lang } = useContext(ContextData);
  return (
    <div className="mb-4">
      <Form.Check
        value="1"
        name="period-rad"
        type="radio"
        label={lang === "AR" ? "فترة أولى فقط." : "First period only"}
        reverse={lang === "AR"}
        onChange={(e) => setPeriod(e.target.value)}
      />
      <Form.Check
        value="2"
        name="period-rad"
        type="radio"
        label={lang === "AR" ? "فترة ثانية فقط." : "Second period only"}
        reverse={lang === "AR"}
        onChange={(e) => setPeriod(e.target.value)}
      />
      <Form.Check
        value="0"
        name="period-rad"
        type="radio"
        label={lang === "AR" ? "فترة أولى وثانية." : "Both periods"}
        reverse={lang === "AR"}
        onChange={(e) => setPeriod(e.target.value)}
        defaultChecked
      />
    </div>
  );
};
