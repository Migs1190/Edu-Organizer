import { ConfigProvider, DatePicker, Space } from "antd";
import arEG from "antd/locale/ar_EG";
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
const { RangePicker } = DatePicker;
import "dayjs/locale/ar";
import { ContextData } from "../../../App";

export const RangeRangePicker = ({ setRange, disabledDate, setFilter, filtered }) => {
  const { langOption } = useContext(ContextData);
  return (
    <>
      <Space id="range-space" className="w-100 justify-content-between">
        <label htmlFor="range-picker" className="">
          {langOption("جدول الامتحانات", "Examination Schedule")}
        </label>
        <ConfigProvider direction={langOption("rtl", "ltr")} locale={langOption("AR", "") && arEG}>
          <RangePicker
            id="range-picker"
            onCalendarChange={(e) => setRange(e)}
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
