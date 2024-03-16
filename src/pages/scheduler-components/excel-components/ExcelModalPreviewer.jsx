import { Form, Modal } from "react-bootstrap";
import { ExcelModalContent } from "./ExcelModalContent";
import { useContext } from "react";
import { ContextData } from "../../../App";

const ExcelModalPreviewer = ({ preview, template, previewWorkbook, showYear }) => {
  const { lang } = useContext(ContextData);
  return (
    <>
      {preview && (
        <Modal id={lang === "AR" ? "ar" : "en"} show={preview} onHide={previewWorkbook} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{lang === "AR" ? "البيانات المرفوعة" : "Submitted Data"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select onChange={showYear} className="mt-2 mb-4 w-auto d-inline" defaultValue="0">
              <option value="0">{lang === "AR" ? "جميع المستويات" : "All Years"}</option>
              <option value="1">{lang === "AR" ? "المستوى الأول" : "First Year"}</option>
              <option value="2">{lang === "AR" ? "المستوى الثاني" : "Second Year"}</option>
              <option value="3">{lang === "AR" ? "المستوى الثالث" : "Third Year"}</option>
              <option value="4">{lang === "AR" ? "المستوى الرابع" : "Fourth Year"}</option>
            </Form.Select>
            <ExcelModalContent template={template} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default ExcelModalPreviewer;
