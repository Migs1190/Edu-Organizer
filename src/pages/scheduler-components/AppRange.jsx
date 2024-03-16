import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ContextData } from "../../App";
import { RangeOutput } from "./range-components/RangeOutput";
import { RangeRangePicker } from "./range-components/RangeRangePicker";

export default function AppRange() {
  const { msgMaker, lang, setFinalSchedule } = useContext(ContextData);
  const [range, setRange] = useState([]);
  const [rangeIsValid, setRangeValidity] = useState(false);
  const [filtered, setFilter] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [key, setKey] = useState(false);
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  const GetRangeDetails = (st, ed) => {
    setRangeValidity(false);
    try {
      const tempUnfiltered = [];
      const tempFiltered = [];
      const start = new Date(`${st.$y}-${st.$M + 1}-${st.$D}`);
      const end = new Date(`${ed.$y}-${ed.$M + 1}-${ed.$D}`);
      let loop = new Date(start);
      const holidays = [
        "7 Jan",
        "25 Jan",
        "25 Apr",
        "1 May",
        "6 May",
        "30 Jun",
        "4 Jul",
        "8 Jul",
        "23 Jul",
        "25 Jul",
        "16 Sep",
        "6 Oct",
        "10 Oct",
      ];
      while (loop <= end) {
        const day = loop.getDate();
        const month = loop.toLocaleDateString("en", { month: "short" });
        tempFiltered.push({
          day: {
            ar: loop.toLocaleDateString("ar", { weekday: "long" }),
            en: loop.toLocaleDateString("en", { weekday: "long" }),
          },
          dayNum: {
            ar: loop.toLocaleDateString("ar", { day: "numeric" }),
            en: loop.toLocaleDateString("en", { day: "numeric" }),
          },
          month: {
            ar: loop.toLocaleDateString("ar", { month: "long" }),
            en: loop.toLocaleDateString("en", { month: "long" }),
          },
          year: {
            ar: loop.toLocaleDateString("ar", { year: "numeric" }),
            en: loop.toLocaleDateString("en", { year: "numeric" }),
          },
          fullDate: {
            ar: loop.toLocaleDateString("ar", { dateStyle: "short" }),
            en: loop.toLocaleDateString("en-GB", { dateStyle: "short" }),
          },
          flagged:
            loop.toLocaleDateString("en", { weekday: "long" }) === "Friday" ||
            holidays.some((h) => h === `${day} ${month}`),
        });

        tempUnfiltered.push({
          day: {
            ar: loop.toLocaleDateString("ar", { weekday: "long" }),
            en: loop.toLocaleDateString("en", { weekday: "long" }),
          },
          dayNum: {
            ar: loop.toLocaleDateString("ar", { day: "numeric" }),
            en: loop.toLocaleDateString("en", { day: "numeric" }),
          },
          month: {
            ar: loop.toLocaleDateString("ar", { month: "long" }),
            en: loop.toLocaleDateString("en", { month: "long" }),
          },
          year: {
            ar: loop.toLocaleDateString("ar", { year: "numeric" }),
            en: loop.toLocaleDateString("en", { year: "numeric" }),
          },
          fullDate: {
            ar: loop.toLocaleDateString("ar", { dateStyle: "short" }),
            en: loop.toLocaleDateString("en-GB", { dateStyle: "short" }),
          },
          flagged: false,
        });
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
      setSchedule(tempUnfiltered);
      setFilteredSchedule(tempFiltered);
      setRangeValidity(true);
    } catch (err) {
      msgMaker("warning", lang === "AR" ? "خطأ اثناء قراءة التاريخ" : "Error while processing time range");
    }
  };

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
    if (range[0] && range[1]) GetRangeDetails(range[0], range[1]);
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
        onClick={finalizeSchedule(filteredSchedule, schedule, setFinalSchedule, filtered, msgMaker, lang)}
      >
        {lang === "AR" ? "حفظ" : "Save"}
      </Button>
    </div>
  );
}

function finalizeSchedule(filteredSchedule, schedule, setFinalSchedule, filtered, msgMaker, lang) {
  return () => {
    if (filteredSchedule.length === 0 || schedule.length === 0) return;
    try {
      setFinalSchedule(filtered ? filteredSchedule.filter((s) => !s.flagged) : schedule.filter((s) => !s.flagged));
      msgMaker("success", lang === "AR" ? "تم حفظ الجدول الزمني" : "Schedule saved succesfully");
    } catch (err) {
      msgMaker("warning", lang === "AR" ? "خطأ اثناء الحفظ" : "Error while saving");
    }
  };
}
