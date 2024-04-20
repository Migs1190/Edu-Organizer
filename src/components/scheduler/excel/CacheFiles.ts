import type { MessageMaker, LangOption } from "../../../types";

export function cacheFiles(
  langOption: LangOption,
  uploaded: File[],
  setUploaded: React.Dispatch<React.SetStateAction<File[]>>,
  msgMaker: MessageMaker,
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    //If no files are uploaded, return -- TypeScript
    if (e.target.files === null) return msgMaker("warning", "No files uploaded");
    //Store the uploaded files in a constant
    const files = e.target.files;
    //Loop through the files
    for (const file of files) {
      //Is the file an excel file?
      if (!file.name.includes("xls") && !file.name.includes("xlsx")) {
        //No? Show a warning notification and continue to the next file
        msgMaker("warning", langOption("امتداد ملف غير مدعوم", "Unsupported file extension"));
        continue;
      }
      //Is this file already uploaded?
      if (uploaded.some((f: File) => f.lastModified === file.lastModified)) continue;
      //No? Add it to the uploaded files
      setUploaded((uploaded) => [...uploaded, file]);
    }
  };
}