// biome-ignore lint/style/useImportType: <explanation>
import React, { useContext, useEffect, useState } from "react";
import { read } from "xlsx";
import { ContextData } from "../../App";
import studentArrayManager from "./excel-components/studentArrayManager";
import ExcelUploader from "./excel-components/ExcelUploader";
import eliminateDuplicates from "./excel-components/EliminateDuplicates";
import ExcelModalPreviewer from "./excel-components/ExcelModalPreviewer";
import type { Workbook } from "../../App";

export type Sheet = {
  [key: string]: unknown;
};

export type SheetCollection = {
  infoSheet: Sheet;
  studentsSheet1: Sheet;
  studentsSheet2: Sheet;
};

export default function SchedulerExcel() {
  const { langOption, finalWorkbook, setFinalWorkbook, msgMaker } = useContext(ContextData);
  const [workbook, setWorkbook] = useState<Workbook[]>([]);
  const [multiSheet, setMSheet] = useState<SheetCollection[]>([]);
  const [uploaded, setUploaded] = useState<File[]>([]);
  const [preview, setPreview] = useState(false);
  const [template, setTemplate] = useState<Workbook[]>([]);

  const deleteUploadedFile = (index: number) => setUploaded((uploaded) => uploaded.filter((_n, i) => i !== index));

  const deleteAllUploaded = () => setUploaded([]);

  async function handleUpload() {
    if (uploaded.length === 0) {
      setTemplate([]);
      setFinalWorkbook([]);
      setWorkbook([]);
    }
    setMSheet([]);
    const tempA: SheetCollection[] = await Promise.all(
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

  const filterByYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year: string = e.target.value;
    if (year === "0") setTemplate(finalWorkbook);
    else setTemplate(finalWorkbook.filter((w) => (w.subjectYear ?? 0) === year));
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
        filterByYear={filterByYear}
      />
    </div>
  );
}
