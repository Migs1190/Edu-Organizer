import React, { Fragment } from "react";

export const TableModalContent = ({
	timeTable,
	lang,
	searchPeriod,
	section,
	rowCounter,
	limiter,
}) => {
	if (limiter === "all" && section === "all") {
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
								<td
									className={`${lang === "AR" ? "ps-0" : "pe-0"} align-middle`}
								>
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
								<td
									className={`${lang === "AR" ? "ps-0" : "pe-0"} align-middle`}
								>
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
	}
	if (limiter === "all" && section !== "all") {
		return (
			<>
				{timeTable.map((T, Ti) => {
					if (
						searchPeriod(T.Period1, section, "dep") ||
						searchPeriod(T.Period2, section, "dep")
					) {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Fragment key={Ti}>
								<tr>
									<td
										className="text-center"
										title={lang === "AR" ? T.day.ar : T.day.en}
										rowSpan={rowCounter(T.Period1, T.Period2, section, "dep")}
									>
										{lang === "AR" ? T.day.ar : T.day.en}
										<br />
										{lang === "AR" ? T.fullDate.ar : T.fullDate.en}
									</td>
								</tr>

								{T.Period1.map(
									(subject, tpi) =>
										subject.enrolledStudents.some(
											(student) => student.dep === section,
										) && (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<tr key={tpi}>
												<td
													className={`${
														lang === "AR" ? "ps-0" : "pe-0"
													} align-middle`}
												>
													{subject.subjectName}
												</td>
												<td className="text-center align-middle">
													{subject.subjectCode}
												</td>
												<td className="text-center align-middle">12:10</td>
											</tr>
										),
								)}
								{T.Period2.map(
									(subject, tpi) =>
										subject.enrolledStudents.some(
											(student) => student.dep === section,
										) && (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<tr key={tpi}>
												<td
													className={`${
														lang === "AR" ? "ps-0" : "pe-0"
													} align-middle`}
												>
													{subject.subjectName}
												</td>
												<td className="text-center align-middle">
													{subject.subjectCode}
												</td>
												<td className="text-center align-middle">3:1</td>
											</tr>
										),
								)}
							</Fragment>
						);
					}
				})}
			</>
		);
	}
	if (limiter !== "all" && section === "all") {
		return (
			<>
				{timeTable.map((T, Ti) => {
					if (
						searchPeriod(T.Period1, limiter, "year") ||
						searchPeriod(T.Period2, limiter, "year")
					) {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Fragment key={Ti}>
								<tr>
									<td
										className="text-center"
										title={lang === "AR" ? T.day.ar : T.day.en}
										rowSpan={rowCounter(T.Period1, T.Period2, limiter, "year")}
									>
										{lang === "AR" ? T.day.ar : T.day.en}
										<br />
										{lang === "AR" ? T.fullDate.ar : T.fullDate.en}
									</td>
								</tr>

								{T.Period1.map(
									(subject, tpi) =>
										subject.enrolledStudents.some(
											(student) => student.year === limiter,
										) && (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<tr key={tpi}>
												<td
													className={`${
														lang === "AR" ? "ps-0" : "pe-0"
													} align-middle`}
												>
													{subject.subjectName}
												</td>
												<td className="text-center align-middle">
													{subject.subjectCode}
												</td>
												<td className="text-center align-middle">12:10</td>
											</tr>
										),
								)}
								{T.Period2.map(
									(subject, tpi) =>
										subject.enrolledStudents.some(
											(student) => student.year === limiter,
										) && (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<tr key={tpi}>
												<td
													className={`${
														lang === "AR" ? "ps-0" : "pe-0"
													} align-middle`}
												>
													{subject.subjectName}
												</td>
												<td className="text-center align-middle">
													{subject.subjectCode}
												</td>
												<td className="text-center align-middle">3:1</td>
											</tr>
										),
								)}
							</Fragment>
						);
					}
				})}
			</>
		);
	}
	if (limiter !== "all" && section !== "all") {
		return (
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
										title={lang === "AR" ? T.day.ar : T.day.en}
										rowSpan={rowCounter(
											T.Period1,
											T.Period2,
											[section, limiter],
											"dep-year",
										)}
									>
										{lang === "AR" ? T.day.ar : T.day.en}
										<br />
										{lang === "AR" ? T.fullDate.ar : T.fullDate.en}
									</td>
								</tr>

								{T.Period1.map(
									(subject, tpi) =>
										subject.enrolledStudents.some(
											(student) =>
												student.dep === section && student.year === limiter,
										) && (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<tr key={tpi}>
												<td
													className={`${
														lang === "AR" ? "ps-0" : "pe-0"
													} align-middle`}
												>
													{subject.subjectName}
												</td>
												<td className="text-center align-middle">
													{subject.subjectCode}
												</td>
												<td className="text-center align-middle">12:10</td>
											</tr>
										),
								)}
								{T.Period2.map(
									(subject, tpi) =>
										subject.enrolledStudents.some(
											(student) =>
												student.dep === section && student.year === limiter,
										) && (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<tr key={tpi}>
												<td
													className={`${
														lang === "AR" ? "ps-0" : "pe-0"
													} align-middle`}
												>
													{subject.subjectName}
												</td>
												<td className="text-center align-middle">
													{subject.subjectCode}
												</td>
												<td className="text-center align-middle">3:1</td>
											</tr>
										),
								)}
							</Fragment>
						);
					}
				})}
			</>
		);
	}
};
