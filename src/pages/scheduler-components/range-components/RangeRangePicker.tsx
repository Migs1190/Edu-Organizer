import { ConfigProvider, DatePicker, Space } from "antd";
import "dayjs/locale/ar";
import arEG from "antd/locale/ar_EG";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext } from "react";
import { Form } from "react-bootstrap";
const { RangePicker } = DatePicker;
import { ContextData } from "../../../App";
import type { Range } from "../SchedulerRange";
import type { Dayjs } from "dayjs";

type RangeDatePickerType = {
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  disabledDate: (current: Dayjs) => boolean;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filtered: boolean;
};

export const RangeRangePicker: FC<RangeDatePickerType> = ({ setRange, disabledDate, setFilter, filtered }) => {
  const { langOption } = useContext(ContextData);
  return (
    <>
      <Space id="range-space" className="w-100 justify-content-between">
        <label htmlFor="range-picker" className="">
          {langOption("جدول الامتحانات", "Examination Schedule")}
        </label>
        <ConfigProvider direction={langOption("rtl", "ltr")} locale={langOption(arEG, "")}>
          <RangePicker
            id="range-picker"
            onCalendarChange={(e) => setRange(e || [null, null])}
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
