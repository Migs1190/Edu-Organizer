import "../styles/AppReview.min.css";
import { Container, Row } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { ContextData } from "../App";
import ReviewModal from "./review-components/ReviewModal";
import TableCards from "./review-components/TableCards";

export default function AppReview() {
  const { langOption } = useContext(ContextData);
  const [preview, setPreview] = useState(false);
  const [template, setTemplate] = useState([]);

  const previewModal = () => setPreview(!preview);

  return (
    <section id="review-section" className="d-flex flex-column align-items-between ">
      <Container>
        <Row className="mb-3" sm={12}>
          <h2 id="review-title" className="lined text-center text-nowrap ">
            {langOption("الجداول المحفوظة", "Saved Timetables")}
          </h2>
        </Row>
        <Row className="h-auto" sm={12}>
          <TableCards previewModal={previewModal} setTemplate={setTemplate} />
          <ReviewModal preview={preview} previewModal={previewModal} timeTable={template} />
        </Row>
      </Container>
    </section>
  );
}
