import React from 'react'
import { Fragment } from 'react'

export const TableModalBothFilters = ({timeTable, T, Ti, searchPeriod, section, limiter, Fragment, key, langOption, rowCounter, subject, tpi, student, tr}) => (
	 <>
        {timeTable.map((T, Ti) => {
          if (
            searchPeriod(T.Period1, [section, limiter], "dep-year") ||
            searchPeriod(T.Period2, [section, limiter], "dep-year")
          ) {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Fragment key={Ti}>
                <tr>
                  <td
                    className="text-center"
                    title={langOption(T.day.ar, T.day.en)}
                    rowSpan={rowCounter(T.Period1, T.Period2, [section, limiter], "dep-year")}
                  >
                    {langOption(T.day.ar, T.day.en)}
                    <br />
                    {langOption(T.fullDate.ar, T.fullDate.en)}
                  </td>
                </tr>

                {T.Period1.map(
                  (subject, tpi) =>
                    subject.enrolledStudents.some((student) => student.dep === section && student.year === limiter) && (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <tr key={tpi}>
                        <td className={`${langOption("ps-0", "pe-0")} align-middle`}>{subject.subjectName}</td>
                        <td className="text-center align-middle">{subject.subjectCode}</td>
                        <td className="text-center align-middle">12:10</td>
                      </tr>
                    )
                )}
                {T.Period2.map(
                  (subject, tpi) =>
                    subject.enrolledStudents.some((student) => student.dep === section && student.year === limiter) && (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <tr key={tpi}>
                        <td className={`${langOption("ps-0", "pe-0")} align-middle`}>{subject.subjectName}</td>
                        <td className="text-center align-middle">{subject.subjectCode}</td>
                        <td className="text-center align-middle">3:1</td>
                      </tr>
                    )
                )}
              </Fragment>
            );
          }
        })}
      </>
)
