import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../../App";
import { RangeOutput } from "./range-components/RangeOutput";
import { RangeRangePicker } from "./range-components/RangeRangePicker";
import { GetRangeDetails, finalizeSchedule } from "./range-components/RangeManager";

export default function AppRange() {
  const { msgMaker, langOption, setFinalSchedule } = useContext(ContextData);
  const [range, setRange] = useState([]);
  const [rangeIsValid, setRangeValidity] = useState(false);
  const [filtered, setFilter] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [key, setKey] = useState(false);
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  const disabledDate = (current) => current && current < dayjs().endOf("day");

  const manageDay = (type, i, filtered) => {
    if (type === "delete") {
      if (filtered) filteredSchedule[i].flagged = true;
      else schedule[i].flagged = true;
    } else if (type === "add") {
      if (filtered) filteredSchedule[i].flagged = false;
      else schedule[i].flagged = false;
    }
    setKey(!key);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (range == null) {
      setRangeValidity(false);
      return;
    }
    if (range[0] && range[1])
      GetRangeDetails(setRangeValidity, setSchedule, setFilteredSchedule, msgMaker, langOption)(range[0], range[1]);
  }, [range]);

  return (
    <div className="px-container pt-5">
      <RangeRangePicker setRange={setRange} disabledDate={disabledDate} setFilter={setFilter} filtered={filtered} />
      <RangeOutput
        rangeIsValid={rangeIsValid}
        schedule={schedule}
        filtered={filtered}
        filteredSchedule={filteredSchedule}
        manageDay={manageDay}
      />
      <Button
        className="d-block mx-auto mt-4"
        onClick={finalizeSchedule(filteredSchedule, schedule, setFinalSchedule, filtered, msgMaker, langOption)}
      >
        {langOption("حفظ", "Save")}
      </Button>
    </div>
  );
}
