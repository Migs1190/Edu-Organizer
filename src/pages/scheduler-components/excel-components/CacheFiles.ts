import type { MessageMaker, LangOption } from "../../../App";

export function cacheFiles(
  langOption: LangOption,
  uploaded: File[],
  setUploaded: React.Dispatch<React.SetStateAction<File[]>>,
  msgMaker: MessageMaker,
  deleteMessage: (key: string) => void
) {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    //Store the uploaded files in a constant
    const files: FileList | null = e.target.files;
    //Show a loading notification
    msgMaker("loading", langOption("جاري رفع الملفات", "Uploading files"), "up", 0);
    //If no files are uploaded, return -- TypeScript
    if (files === null) return;
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
    deleteMessage("up");
  };
}
