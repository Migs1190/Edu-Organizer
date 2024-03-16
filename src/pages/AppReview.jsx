import "../styles/AppReview.min.css";
import React, { useContext, useState } from "react";
import { Badge, Button, Card, Container, Row } from "react-bootstrap";
import { ReviewModal } from "./review-components/ReviewModal";
import { ContextData } from "../App";

export default function AppReview() {
  const { lang } = useContext(ContextData);
  const [timetables, setTimetables] = useState(JSON.parse(localStorage.getItem("savedTables")));
  const [preview, setPreview] = useState(false);
  const [template, setTemplate] = useState([]);

  const previewModal = () => setPreview(!preview);

  return (
    <section id="review-section" className="nav-foot-spacing d-flex flex-column align-items-between ">
      <Container s>
        <Row className="lined-row mb-3" sm={12}>
          <h2 id="review-title" className="lined text-center text-nowrap ">
            {lang === "AR" ? "الجداول المحفوظة" : "Saved Timetables"}
          </h2>
        </Row>
        <Row id="review-content" className="h-auto" sm={12}>
          <TableCards
            lang={lang}
            previewModal={previewModal}
            setTemplate={setTemplate}
            timetables={timetables}
            setTimetables={setTimetables}
            deleteCard={deleteCard}
          />
          <ReviewModal lang={lang} preview={preview} previewModal={previewModal} timeTable={template} />
        </Row>
      </Container>
    </section>
  );
}

/* The `TableCards` component is a functional component that takes in four props: `lang`,
`previewModal`, `setTemplate`, and `timetables`. */
const TableCards = ({ lang, previewModal, setTemplate, timetables, setTimetables, deleteCard }) => (
  <>
    {timetables !== null && timetables.length !== 0 ? (
      timetables.map((table, ti) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Card bg="light" className="tables-card mb-3 mx-auto " key={ti}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              {lang === "AR" ? "التاريخ: " : "Date: "}
              <Badge bg="secondary">{lang === "AR" ? table.dateAr[0] : table.dateEn[0]}</Badge>
              <br />
              {lang === "AR" ? "الوقت: " : "Time: "}
              <Badge bg="secondary">{lang === "AR" ? table.dateAr[1] : table.dateEn[1]}</Badge>
            </div>
            <div>
              <Button
                className="btn-sm mx-1"
                onClick={() => {
                  previewModal();
                  setTemplate(table.content);
                }}
              >
                {lang === "AR" ? "عرض" : "Preview"}
              </Button>
              <Button className="btn-sm" onClick={() => deleteCard(setTimetables, ti)} variant="danger">
                {lang === "AR" ? "حذف" : "Delete"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))
    ) : (
      <Card className="no-tables-card" bg="danger-subtle">
        <Card.Body>{lang === "AR" ? "لا يوجد جداول محفوظة" : "No Saved timetables"}</Card.Body>
      </Card>
    )}
  </>
);

const deleteCard = (setTimetables, index) => {
  const temp = JSON.parse(localStorage.getItem("savedTables"));
  temp.splice(index, 1);
  localStorage.setItem("savedTables", JSON.stringify(temp));
  setTimetables(JSON.parse(localStorage.getItem("savedTables")));
};
