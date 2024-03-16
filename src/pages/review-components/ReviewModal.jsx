import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ExportSheet from "../general-components/ExportSheet";
import { ReviewModalContent } from "../review-components/ReviewModalContent";
import { ContextData } from "../../App";

/**
 * The ReviewModal component is a modal that displays a table of previous timetables and allows the
 * user to export the table as an Excel file.
 */
export const ReviewModal = ({ preview, previewModal, timeTable }) => {
  const { lang } = useContext(ContextData);
  return (
    <Modal id={lang === "AR" ? "ar" : "en"} show={preview} onHide={previewModal} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{lang === "AR" ? "مراجعة جدول سابق" : "Reviewing an old timetable"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-align-items-center mb-3">
          <Button
            variant="outline-body"
            className="shadow-hover border h-100 py-2"
            onClick={() => ExportSheet(timeTable)}
            title={`${lang === "AR" ? "تصدير ملف إكسيل" : "export excel file"}`}
          >
            <FontAwesomeIcon icon={faTable} size="lg" />
          </Button>
        </div>
        <Table id="table" striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th className="text-center">{lang === "AR" ? "التاريخ" : "Date"}</th>
              <th>{lang === "AR" ? "اسم المقرر" : "Subject Name"}</th>
              <th className="text-nowrap text-center">{lang === "AR" ? "كود المقرر" : "Subject Code"}</th>
              <th className="text-nowrap text-center">{lang === "AR" ? "الفترة" : "Period"}</th>
            </tr>
          </thead>
          <tbody>
            <ReviewModalContent timeTable={timeTable} lang={lang} />
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
