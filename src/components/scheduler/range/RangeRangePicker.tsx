import { ConfigProvider, DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import "dayjs/locale/ar";
import arEG from "antd/locale/ar_EG";
import enUS from "antd/locale/en_US";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext } from "react";
import { Form } from "react-bootstrap";
import { ContextData } from "../../../App";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Range } from "../../../types";

type RangeDatePickerType = {
	setRange: React.Dispatch<React.SetStateAction<Range>>;
	setFilter: React.Dispatch<React.SetStateAction<boolean>>;
	filtered: boolean;
};

export const RangeRangePicker: FC<RangeDatePickerType> = ({ setRange, setFilter, filtered }) => {
	const { langOption } = useContext(ContextData);
	const disabledDate = (current: Dayjs) => current && current < dayjs().subtract(1, "day").endOf("day");
	return (
		<>
			<Space id="range-space" className="w-100 justify-content-between">
				<label htmlFor="range-picker">{langOption("جدول الامتحانات", "Examination Schedule")}</label>
				<ConfigProvider direction={langOption("rtl", "ltr")} locale={langOption(arEG, enUS)}>
						<RangePicker
							id="range-picker"
							onCalendarChange={setRange}
							allowEmpty={[false, false]}
							disabledDate={disabledDate}
							placeholder={langOption(["تاريخ البدء", "تاريخ الانتهاء"], ["Start Date", "End Date"])}
						/>
				</ConfigProvider>
			</Space>
			<Form.Check
				type="switch"
				id="range-filter-switch"
				className="my-3"
				defaultChecked={true}
				label={langOption("إزالة أيام العطل", "Remove Holidays")}
				onChange={() => setFilter(!filtered)}
			/>
		</>
	);
};
