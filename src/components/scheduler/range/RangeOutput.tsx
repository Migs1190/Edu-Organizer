import { faSquareMinus, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../../../App";
import type { Schedule } from "../../../types";

type RangeOutputType = {
  rangeIsValid: boolean;
  schedule: Schedule[];
  filtered: boolean;
  filteredSchedule: Schedule[];
  manageDay: (type: "delete" | "add", i: number, filtered: boolean) => void;
};

export const RangeOutput: FC<RangeOutputType> = ({ rangeIsValid, schedule, filtered, filteredSchedule, manageDay }) => {
  const { langOption } = useContext(ContextData);
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
                    {langOption(
                      `${s.day.ar} - ${s.dayNum.ar} ${s.month.ar} - ${s.year.ar}`,
                      `${s.day.en} - ${s.dayNum.en} ${s.month.en} - ${s.year.en}`
                    )}
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
                    {langOption(
                      `${s.day.ar} - ${s.dayNum.ar} ${s.month.ar} - ${s.year.ar}`,
                      `${s.day.en} - ${s.dayNum.en} ${s.month.en} - ${s.year.en}`
                    )}
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
