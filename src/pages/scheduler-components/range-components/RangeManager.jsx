import dayjs from "dayjs";

export function GetRangeDetails(setRangeValidity, setSchedule, setFilteredSchedule, msgMaker, langOption) {
  return (st, ed) => {
    setRangeValidity(false);
    try {
      const tempUnfiltered = [];
      const tempFiltered = [];
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
            ar: loop.format("dddd"),
            en: loop.format("dddd"),
          },
          dayNum: {
            ar: loop.format("D"),
            en: loop.format("D"),
          },
          month: {
            ar: loop.format("MMMM"),
            en: loop.format("MMMM"),
          },
          year: {
            ar: loop.format("YYYY"),
            en: loop.format("YYYY"),
          },
          fullDate: {
            ar: loop.format("DD/MM/YYYY"),
            en: loop.format("DD/MM/YYYY"),
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
      msgMaker("warning", langOption("خطأ اثناء قراءة التاريخ", "Error while processing time range"));
    }
  };
}
export function finalizeSchedule(filteredSchedule, schedule, setFinalSchedule, filtered, msgMaker, langOption) {
  return () => {
    if (filteredSchedule.length === 0 || schedule.length === 0) return;
    try {
      setFinalSchedule(filtered ? filteredSchedule.filter((s) => !s.flagged) : schedule.filter((s) => !s.flagged));
      msgMaker("success", langOption("تم حفظ الجدول الزمني", "Schedule saved succesfully"));
    } catch (err) {
      msgMaker("warning", langOption("خطأ اثناء الحفظ", "Error while saving"));
    }
  };
}
