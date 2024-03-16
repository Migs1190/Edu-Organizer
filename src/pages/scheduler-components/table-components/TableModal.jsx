import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ExportSheet from "../../general-components/ExportSheet";
import { TableModalContent } from "./TableModalContent";
import { ContextData } from "../../../App";

export const TableModal = ({
  preview,
  previewWorkbook,
  showYear,
  showSection,
  timeTable,
  getAllOptions,
  searchPeriod,
  section,
  rowCounter,
  limiter,
}) => {
  const { lang, finalWorkbook } = useContext(ContextData);
  return (
    <Modal id={lang === "AR" ? "ar" : "en"} show={preview} onHide={previewWorkbook} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{lang === "AR" ? "الجدول النهائي" : "Final Timetable"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-align-items-center mb-3">
          <Form.Group>
            <Form.Select className="w-auto d-inline" onClick={showYear} defaultValue="all">
              <option value="all">{lang === "AR" ? "جميع المستويات" : "All Years"}</option>
              {getAllOptions(finalWorkbook, "year")}
            </Form.Select>
            <Form.Select className="mx-3 w-auto d-inline" onClick={showSection} defaultValue="all">
              <option value="all">{lang === "AR" ? "جميع الشعب" : "All Sections"}</option>
              {getAllOptions(finalWorkbook, "dep")}
            </Form.Select>
          </Form.Group>
          <Button
            variant="outline-body"
            className="export-btn border h-100 py-2"
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
            <TableModalContent
              timeTable={timeTable}
              lang={lang}
              searchPeriod={searchPeriod}
              section={section}
              rowCounter={rowCounter}
              limiter={limiter}
            />
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
