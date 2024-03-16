import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ContextData } from "../../App";
import Excel from "./AppExcel";
import Range from "./AppRange";
import Table from "./AppTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const SchedulerTabs = () => {
  const { lang } = useContext(ContextData);
  const tabs = [
    {
      id: 1,
      tabTitle: lang === "AR" ? "الجدول الزمني" : "Time schedule",
      eventKey: "time-range",
      paneContent: <Range />,
    },
    {
      id: 2,
      tabTitle:
        lang === "AR" ? (
          <FontAwesomeIcon icon={faCircleArrowLeft} className="text-primary" />
        ) : (
          <FontAwesomeIcon icon={faCircleArrowRight} className="text-primary" />
        ),
      eventKey: "dot1",
      disabled: true,
    },
    {
      id: 3,
      tabTitle: lang === "AR" ? "المقررات" : "Subjects",
      eventKey: "subjects",
      paneContent: <Excel />,
    },
    {
      id: 4,
      tabTitle:
        lang === "AR" ? (
          <FontAwesomeIcon icon={faCircleArrowLeft} className="text-primary" />
        ) : (
          <FontAwesomeIcon icon={faCircleArrowRight} className="text-primary" />
        ),
      eventKey: "dot2",
      disabled: true,
    },
    {
      id: 5,
      tabTitle: lang === "AR" ? "تكوين جدول" : "Generate timetable",
      eventKey: "table",
      paneContent: <Table />,
    },
  ];

  return (
    <section id="scheduler-section">
      <Tabs
        defaultActiveKey="time-range"
        id="fill-tab-example"
        className="mb-5 bg-body-secondary p-2"
        fill
        variant="pills"
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} eventKey={tab.eventKey} title={tab.tabTitle} disabled={tab.disabled}>
            {tab.paneContent}
          </Tab>
        ))}
      </Tabs>
    </section>
  );
};

export default SchedulerTabs;
