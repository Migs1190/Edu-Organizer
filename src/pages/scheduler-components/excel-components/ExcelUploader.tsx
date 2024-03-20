import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { FC, MouseEventHandler, useContext } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { cacheFiles } from "./CacheFiles";
import { ContextData } from "../../../App";

/*
Contents:
  - The File Input that receives the excel sheets
  - The list of uploaded files
  - The buttons to upload, delete, and preview the uploaded files
*/

type ExcelUploaderType = {
  uploaded: File[];
  setUploaded: React.Dispatch<React.SetStateAction<File[]>>;
  deleteUploadedFile: (index: number) => void;
  handleUpload: () => Promise<void>;
  deleteAllUploaded: () => void;
  previewWorkbook: () => void;
};

const ExcelUploader: FC<ExcelUploaderType> = ({
  uploaded,
  setUploaded,
  deleteUploadedFile,
  handleUpload,
  deleteAllUploaded,
  previewWorkbook,
}) => {
  const { langOption, finalWorkbook, msgMaker, deleteMessage } = useContext(ContextData);
  return (
    <>
      <div id="file-uploader" className="bg-body-secondary border rounded mx-auto position-relative">
        <input
          type="file"
          multiple
          accept=".xls, .xlsx"
          onChange={(e) => cacheFiles(langOption, uploaded, setUploaded, msgMaker, deleteMessage)(e)}
          className="opacity-0 position-absolute w-100 h-100"
        />
        <div className="text-center">
          <FontAwesomeIcon icon={faFileArrowUp} size="4x" className="text-primary" />
          <p className="mt-2 text-primary">
            {langOption("اضغط لرفع الكشوفات", "Click to upload your files")}
            <br />
            <span className="pe-none text-dark opacity-25">(xls - xlsx)</span>
          </p>
        </div>
      </div>

      <div className="uploaded-files mx-auto overflow-auto bg-light rounded border my-3 px-1">
        {uploaded.length !== 0 &&
          uploaded.map((file: File, fi: number) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={fi}
              className="bg-white border rounded my-2 p-2 d-flex justify-content-between align-items-center"
            >
              {file.name.split(".")[0]}
              <Button variant="light" className="border text-dark" onClick={() => deleteUploadedFile(fi)}>
                <FontAwesomeIcon icon={faSquareMinus} />
              </Button>
            </div>
          ))}
      </div>
      <div>
        <ButtonGroup dir="ltr" className="d-block mx-auto">
          <Button className="w-75" onClick={handleUpload as unknown as MouseEventHandler<HTMLButtonElement>}>
            {langOption("رفع الملفات", "Submit")}
            {"	"}({uploaded.length})
          </Button>
          <Button className="w-25 btn-danger text-nowrap" onClick={deleteAllUploaded}>
            {langOption("حذف الكل", "Delete all")}
          </Button>
        </ButtonGroup>
        <Button className="d-block mx-auto mt-2" disabled={finalWorkbook.length === 0} onClick={previewWorkbook}>
          {langOption("عرض البيانات المرفوعة", "Preview")}
        </Button>
      </div>
    </>
  );
};
export default ExcelUploader;
