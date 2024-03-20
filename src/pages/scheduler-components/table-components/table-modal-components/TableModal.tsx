import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, useContext } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ExportSheet from "../../../general-components/ExportSheet";
import TableModalContent from "./TableModalContent";
import { ContextData } from "../../../../App";
import { getAllOptions } from "../TableManager";
import type { TimeTable } from "../../SchedulerTable";

type TableModalType = {
  preview: boolean;
  previewWorkbook: () => void;
  filterByYear: (e: React.MouseEvent) => void;
  filterBySection: (e: React.MouseEvent) => void;
  timeTable: TimeTable[];
  section: string;
  limiter: string;
};

const TableModal: FC<TableModalType> = ({
  preview,
  previewWorkbook,
  filterByYear,
  filterBySection,
  timeTable,
  section,
  limiter,
}) => {
  const { lang, langOption, finalWorkbook } = useContext(ContextData);
  return (
    <Modal id={lang?.toLowerCase()} show={preview} onHide={previewWorkbook} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{langOption("الجدول النهائي", "Final Timetable")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-align-items-center mb-3">
          <Form.Group>
            <Form.Select className="w-auto d-inline" onClick={filterByYear} defaultValue="all">
              <option value="all">{langOption("جميع المستويات", "All Years")}</option>
              {getAllOptions(finalWorkbook, "year")}
            </Form.Select>
            <Form.Select className="mx-3 w-auto d-inline" onClick={filterBySection} defaultValue="all">
              <option value="all">{langOption("جميع الشعب", "All Sections")}</option>
              {getAllOptions(finalWorkbook, "dep")}
            </Form.Select>
          </Form.Group>
          <Button
            variant="outline-body"
            className="border h-100 py-2"
            onClick={() => ExportSheet(timeTable)}
            title={langOption("تصدير ملف إكسيل", "export excel sheet")}
          >
            <FontAwesomeIcon icon={faTable} size="lg" />
          </Button>
        </div>

        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th className="text-center">{langOption("التاريخ", "Date")}</th>
              <th>{langOption("اسم المقرر", "Subject Name")}</th>
              <th className="text-nowrap text-center">{langOption("كود المقرر", "Subject Code")}</th>
              <th className="text-nowrap text-center">{langOption("الفترة", "Period")}</th>
            </tr>
          </thead>
          <tbody>
            <TableModalContent timeTable={timeTable} section={section} limiter={limiter} />
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
export default TableModal;
