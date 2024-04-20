import "../styles/AppReview.min.css";
import { Container, Row } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { ContextData } from "../App";
import ReviewModal from "../components/review/ReviewModal";
import TableCards from "../components/review/TableCards";
import type { TimeTable } from "../components/scheduler/SchedulerTable";

function AppReview() {
  const { langOption } = useContext(ContextData);
  const [preview, setPreview] = useState(false);
  const [template, setTemplate] = useState<TimeTable[]>([]);

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
export default AppReview;
