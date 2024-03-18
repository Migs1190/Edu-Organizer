import { Form, Modal } from "react-bootstrap";
import { ExcelModalContent } from "./ExcelModalContent";
import { useContext } from "react";
import { ContextData } from "../../../App";

const ExcelModalPreviewer = ({ preview, template, previewWorkbook, showYear }) => {
  const { langOption } = useContext(ContextData);
  return (
    <>
      {preview && (
        <Modal id={langOption("ar", "en")} show={preview} onHide={previewWorkbook} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{langOption("البيانات المرفوعة", "Submitted Data")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select onChange={showYear} className="mt-2 mb-4 w-auto d-inline" defaultValue="0">
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
