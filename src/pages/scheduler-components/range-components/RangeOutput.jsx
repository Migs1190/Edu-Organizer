import { faSquareMinus, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../../../App";

export const RangeOutput = ({ rangeIsValid, schedule, filtered, filteredSchedule, manageDay }) => {
  const { lang } = useContext(ContextData);
  return (
    <div id="schedule-output" className="bg-light mx-auto border rounded p-2">
      {rangeIsValid &&
        (filtered
          ? filteredSchedule.map((s, index) => {
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className={`${
                    s.flagged ? "bg-danger-subtle" : "bg-success-subtle"
                  } day w-100 border p-2 rounded my-1  d-flex justify-content-between align-items-center`}
                >
                  <span>
                    {lang === "AR"
                      ? `${s.day.ar} - ${s.dayNum.ar} ${s.month.ar} - ${s.year.ar}`
                      : `${s.day.en} - ${s.dayNum.en} ${s.month.en} - ${s.year.en}`}
                  </span>
                  {s.flagged ? (
                    <Button
                      variant="light"
                      className="uploaded-file-add border text-dark"
                      onClick={() => manageDay("add", index, true)}
                    >
                      <FontAwesomeIcon icon={faSquarePlus} />
                    </Button>
                  ) : (
                    <Button
                      variant="light"
                      className="uploaded-file-delete border text-dark"
                      onClick={() => manageDay("delete", index, true)}
                    >
                      <FontAwesomeIcon icon={faSquareMinus} />
                    </Button>
                  )}
                </div>
              );
            })
          : schedule.map((s, index) => {
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className={`${
                    s.flagged ? "bg-danger-subtle" : "bg-success-subtle"
                  }  day w-100 border p-2 rounded my-1  d-flex justify-content-between align-items-center`}
                >
                  <span>
                    {lang === "AR"
                      ? `${s.day.ar} - ${s.dayNum.ar} ${s.month.ar} - ${s.year.ar}`
                      : `${s.day.en} - ${s.dayNum.en} ${s.month.en} - ${s.year.en}`}
                  </span>
                  {s.flagged ? (
                    <Button
                      variant="light"
                      className="uploaded-file-add border text-dark"
                      onClick={() => manageDay("add", index, false)}
                    >
                      <FontAwesomeIcon icon={faSquarePlus} />
                    </Button>
                  ) : (
                    <Button
                      variant="light"
                      className="uploaded-file-delete border text-dark"
                      onClick={() => manageDay("delete", index, false)}
                    >
                      <FontAwesomeIcon icon={faSquareMinus} />
                    </Button>
                  )}
                </div>
              );
            }))}
    </div>
  );
};
