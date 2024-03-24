import dayjs from "dayjs";
import type { LangOption, MessageMaker, Schedule } from "../../../App";
import type { Dayjs } from "dayjs";

type GetRangeDetailsType = (
  setRangeValidity: React.Dispatch<React.SetStateAction<boolean>>,
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
  setFilteredSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
  msgMaker: MessageMaker,
  langOption: LangOption
) => (st: Dayjs, ed: Dayjs) => void;

const GetRangeDetails: GetRangeDetailsType = (
  setRangeValidity,
  setSchedule,
  setFilteredSchedule,
  msgMaker,
  langOption
) => {
  return (st, ed) => {
    setRangeValidity(false);
    try {
      const tempUnfiltered: Schedule[] = [];
      const tempFiltered: Schedule[] = [];
      const start = dayjs(st);
      const end = dayjs(ed);
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

      for (let loop = start; loop <= end; loop = loop.add(1, "day")) {
        const day = loop.date();
        const month = loop.format("MMM");

        const commonData = {
          day: {
            ar: loop.locale("ar").format("dddd"),
            en: loop.locale("en").format("dddd"),
          },
          dayNum: {
            ar: loop.locale("ar").format("D"),
            en: loop.locale("en").format("D"),
          },
          month: {
            ar: loop.locale("ar").format("MMMM"),
            en: loop.locale("en").format("MMMM"),
          },
          year: {
            ar: loop.locale("ar").format("YYYY"),
            en: loop.locale("en").format("YYYY"),
          },
          fullDate: {
            ar: loop.locale("ar").format("DD/MM/YYYY"),
            en: loop.locale("en").format("DD/MM/YYYY"),
          },
        };

        tempFiltered.push({
          ...commonData,
          flagged: loop.format("dddd") === "Friday" || holidays.some((h) => h === `${day} ${month}`),
        });

        tempUnfiltered.push({
          ...commonData,
          flagged: false,
        });
      }
      setSchedule(tempUnfiltered);
      setFilteredSchedule(tempFiltered);
      setRangeValidity(true);
    } catch (err) {
      console.error("Look in RangeManager line 78", err);

      msgMaker("warning", langOption("خطأ اثناء قراءة التاريخ", "Error while processing time range"));
    }
  };
};

type finalizeScheduleType = (
  filteredSchedule: Schedule[],
  schedule: Schedule[],
  setFinalSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
  filtered: boolean,
  msgMaker: MessageMaker,
  langOption: LangOption
) => () => void;

const finalizeSchedule: finalizeScheduleType = (
  filteredSchedule,
  schedule,
  setFinalSchedule,
  filtered,
  msgMaker,
  langOption
) => {
  return () => {
    if (filteredSchedule.length === 0 || schedule.length === 0) return;
    try {
      setFinalSchedule(filtered ? filteredSchedule.filter((s) => !s.flagged) : schedule.filter((s) => !s.flagged));
      msgMaker("success", langOption("تم حفظ الجدول الزمني", "Schedule saved successfully"));
    } catch (err) {
      msgMaker("warning", langOption("خطأ اثناء الحفظ", "Error while saving"));
    }
  };
};

export { GetRangeDetails, finalizeSchedule };
