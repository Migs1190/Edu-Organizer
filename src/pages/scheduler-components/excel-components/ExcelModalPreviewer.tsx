import { Form, Modal } from "react-bootstrap";
import { ExcelModalContent } from "./ExcelModalContent";
import React, { useContext, FC } from "react";
import { ContextData } from "../../../App";
import type { Workbook } from "../../../App";
/*
Contents:
  - The modal that previews the uploaded excel sheets' content
*/

type ExcelModalPreviewerType = {
  preview: boolean;
  template: Workbook[];
  previewWorkbook: () => void;
  filterByYear: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const ExcelModalPreviewer: FC<ExcelModalPreviewerType> = ({ preview, template, previewWorkbook, filterByYear }) => {
  const { langOption } = useContext(ContextData);
  return (
    <>
      {preview && (
        <Modal id={langOption("ar", "en")} show={preview} onHide={previewWorkbook} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{langOption("البيانات المرفوعة", "Submitted Data")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select onChange={filterByYear} className="mt-2 mb-4 w-auto d-inline" defaultValue="0">
              <option value="0">{langOption("جميع المستويات", "All Years")}</option>
              <option value="1">{langOption("المستوى الأول", "First Year")}</option>
              <option value="2">{langOption("المستوى الثاني", "Second Year")}</option>
              <option value="3">{langOption("المستوى الثالث", "Third Year")}</option>
              <option value="4">{langOption("المستوى الرابع", "Fourth Year")}</option>
            </Form.Select>
            <ExcelModalContent template={template} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default ExcelModalPreviewer;
