import React from "react";
import { Fragment } from "react";

export const TableModalNoFilter = ({ timeTable, langOption }) => (
  <>
    {timeTable.map((T, Ti) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <Fragment key={Ti}>
        <tr>
          <td
            className="text-center"
            title={langOption(T.day.ar, T.day.en)}
            rowSpan={T.Period1.length + T.Period2.length + 1}
          >
            {langOption(T.day.ar, T.day.en)} <br />
            {langOption(T.fullDate.ar, T.fullDate.en)}
          </td>
        </tr>
        {T.Period1.map((subject, tpi) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <tr key={tpi}>
            <td className={`${langOption("ps-0", "pe-0")} align-middle`}>{subject.subjectName}</td>
            <td className="text-center align-middle">{subject.subjectCode}</td>
            <td className="text-center align-middle">12:10</td>
          </tr>
        ))}
        {T.Period2.map((subject, tpi) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <tr key={tpi}>
            <td className={`${langOption("ps-0", "pe-0")} align-middle`}>{subject.subjectName}</td>
            <td className="text-center align-middle">{subject.subjectCode}</td>
            <td className="text-center align-middle">3:1</td>
          </tr>
        ))}
      </Fragment>
    ))}
  </>
);
