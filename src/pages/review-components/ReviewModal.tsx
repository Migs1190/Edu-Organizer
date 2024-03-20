import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ExportSheet from "../general-components/ExportSheet";
import ReviewModalContent from "./ReviewModalContent";
import { ContextData } from "../../App";
import type { TimeTable } from "../scheduler-components/SchedulerTable";

type ReviewModalType = {
  preview: boolean;
  previewModal: () => void;
  timeTable: TimeTable[];
};

const ReviewModal: FC<ReviewModalType> = ({ preview, previewModal, timeTable }) => {
  const { langOption } = useContext(ContextData);

  return (
    <Modal id={langOption("ar", "en")} show={preview} onHide={previewModal} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{langOption("مراجعة جدول سابق", "Reviewing an old timetable")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-align-items-center mb-3">
          <Button
            variant="outline-body"
            className="shadow-hover border h-100 py-2"
            onClick={() => ExportSheet(timeTable)}
            title={langOption("تصدير ملف إكسيل", "export excel file")}
          >
            <FontAwesomeIcon icon={faTable} size="lg" />
          </Button>
        </div>
        <Table id="table" striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th className="text-center">{langOption("التاريخ", "Date")}</th>
              <th>{langOption("اسم المقرر", "Subject Name")}</th>
              <th className="text-nowrap text-center">{langOption("كود المقرر", "Subject Code")}</th>
              <th className="text-nowrap text-center">{langOption("الفترة", "Period")}</th>
            </tr>
          </thead>
          <tbody>
            <ReviewModalContent timeTable={timeTable} />
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
