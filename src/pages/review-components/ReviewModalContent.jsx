import React, { Fragment } from "react";

/* The code is exporting a React component called `ReviewModalContent`. This component takes two props,
`timeTable` and `lang`. */
export const ReviewModalContent = ({ timeTable, lang }) => {
	return (
		<>
			{timeTable.map((T, Ti) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<Fragment key={Ti}>
					<tr>
						<td
							className="text-center"
							title={lang === "AR" ? T.day.ar : T.day.en}
							rowSpan={T.Period1.length + T.Period2.length + 1}
						>
							{lang === "AR" ? T.day.ar : T.day.en} <br />
							{lang === "AR" ? T.fullDate.ar : T.fullDate.en}
						</td>
					</tr>
					{T.Period1.map((subject, tpi) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<tr key={tpi}>
							<td className={`${lang === "AR" ? "ps-0" : "pe-0"} align-middle`}>
								{subject.subjectName}
							</td>
							<td className="text-center align-middle">
								{subject.subjectCode}
							</td>
							<td className="text-center align-middle">12:10</td>
						</tr>
					))}
					{T.Period2.map((subject, tpi) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<tr key={tpi}>
							<td className={`${lang === "AR" ? "ps-0" : "pe-0"} align-middle`}>
								{subject.subjectName}
							</td>
							<td className="text-center align-middle">
								{subject.subjectCode}
							</td>
							<td className="text-center align-middle">3:1</td>
						</tr>
					))}
				</Fragment>
			))}
		</>
	);
};
