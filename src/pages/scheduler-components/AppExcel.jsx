import React, { useContext, useEffect, useState } from "react";
import { read } from "xlsx";
import { ContextData } from "../../App";
import studentArrayManager from "./excel-components/studentArrayManager";
import ExcelUploader from "./excel-components/ExcelUploader";
import eliminateDuplicates from "./excel-components/EliminateDuplicates";
import ExcelModalPreviewer from "./excel-components/ExcelModalPreviewer";

export default function AppExcel() {
  const { langOption, finalWorkbook, setFinalWorkbook, msgMaker } = useContext(ContextData);
  const [workbook, setWorkbook] = useState([]);
  const [multiSheet, setMSheet] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [preview, setPreview] = useState(false);
  const [template, setTemplate] = useState([]);

  const deleteUploadedFile = (index) => setUploaded((uploaded) => uploaded.filter((_n, i) => i !== index));

  const deleteAllUploaded = () => setUploaded([]);

  async function handleUpload() {
    if (uploaded.length === 0) {
      setTemplate([]);
      setFinalWorkbook([]);
      setWorkbook([]);
    }
    setMSheet([]);
    const tempA = await Promise.all(
      uploaded.map(async (file) => {
        const ab = await file.arrayBuffer();
        const wb = read(ab);
        return {
          infoSheet: wb.Sheets[wb.SheetNames[0]],
          studentsSheet1: wb.Sheets[wb.SheetNames[1]],
          studentsSheet2: wb.Sheets[wb.SheetNames[2]],
        };
      })
    );

    setMSheet(tempA);
    msgMaker("success", langOption("تم رفع المقررات", "Subjects uploaded successfully"));
  }

  const previewWorkbook = () => {
    setTemplate(finalWorkbook);
    setPreview(!preview);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setWorkbook([]);
    for (const sheet of multiSheet) studentArrayManager(setWorkbook, langOption, msgMaker)(sheet);
  }, [multiSheet]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (workbook.length !== 0) eliminateDuplicates(workbook, setFinalWorkbook);
  }, [workbook]);

  useEffect(() => setTemplate(finalWorkbook), [finalWorkbook]);

  const filterByYear = (e) => {
    if (e.target.value === 0) setTemplate(finalWorkbook);
    else setTemplate(finalWorkbook.filter((w) => +w.subjectYear === +e.target.value));
  };

  return (
    <div className="px-container">
      <ExcelUploader
        uploaded={uploaded}
        setUploaded={setUploaded}
        deleteUploadedFile={deleteUploadedFile}
        handleUpload={handleUpload}
        deleteAllUploaded={deleteAllUploaded}
        previewWorkbook={previewWorkbook}
      />
      <ExcelModalPreviewer
        preview={preview}
        template={template}
        previewWorkbook={previewWorkbook}
        showYear={filterByYear}
      />
    </div>
  );
}
