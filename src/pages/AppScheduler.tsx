import '../sass/AppScheduler.scss';
import React, { useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ContextData } from '../App';
import Excel from '../components/scheduler/SchedulerExcel';
import Range from '../components/scheduler/SchedulerRange';
import Table from '../components/scheduler/SchedulerTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

const AppScheduler = () => {
  const { langOption } = useContext(ContextData);
  const tabs = [
    {
      id: 1,
      tabTitle: langOption('الجدول الزمني', 'Time schedule'),
      eventKey: 'time-range',
      paneContent: <Range />,
    },
    {
      id: 2,
      tabTitle: langOption(
        <FontAwesomeIcon icon={faCircleArrowLeft} className="text-primary" />,
        <FontAwesomeIcon icon={faCircleArrowRight} className="text-primary" />,
      ),
      eventKey: 'dot1',
      disabled: true,
    },
    {
      id: 3,
      tabTitle: langOption('المقررات', 'Subjects'),
      eventKey: 'subjects',
      paneContent: <Excel />,
    },
    {
      id: 4,
      tabTitle: langOption(
        <FontAwesomeIcon icon={faCircleArrowLeft} className="text-primary" />,
        <FontAwesomeIcon icon={faCircleArrowRight} className="text-primary" />,
      ),
      eventKey: 'dot2',
      disabled: true,
    },
    {
      id: 5,
      tabTitle: langOption('تكوين جدول', 'Generate timetable'),
      eventKey: 'table',
      paneContent: <Table />,
    },
  ];

  return (
    <section id="scheduler-section">
      <Tabs defaultActiveKey="time-range" className="mb-5 bg-body-secondary p-2" fill variant="pills">
        {tabs.map((tab) => (
          <Tab key={tab.id} eventKey={tab.eventKey} title={tab.tabTitle} disabled={tab.disabled}>
            {tab.paneContent}
          </Tab>
        ))}
      </Tabs>
    </section>
  );
};

export default AppScheduler;
