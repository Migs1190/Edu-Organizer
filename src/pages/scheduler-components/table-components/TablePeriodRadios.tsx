// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext } from "react";
import { Form } from "react-bootstrap";
import { ContextData } from "../../../App";

type TablePeriodRadiosType = {
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
};

export const TablePeriodRadios: FC<TablePeriodRadiosType> = ({ setPeriod }) => {
  const { langOption } = useContext(ContextData);
  return (
    <div className="mb-4">
      <Form.Check
        value="1"
        name="period-rad"
        type="radio"
        label={langOption("فترة أولى فقط.", "First period only")}
        reverse={langOption(true, false)}
        onChange={(e) => setPeriod(e.target.value)}
      />
      <Form.Check
        value="2"
        name="period-rad"
        type="radio"
        label={langOption("فترة ثانية فقط.", "Second period only")}
        reverse={langOption(true, false)}
        onChange={(e) => setPeriod(e.target.value)}
      />
      <Form.Check
        value="0"
        name="period-rad"
        type="radio"
        label={langOption("فترة أولى وثانية.", "Both periods")}
        reverse={langOption(true, false)}
        onChange={(e) => setPeriod(e.target.value)}
        defaultChecked
      />
    </div>
  );
};
