/**
 * The cacheFiles function uploads Excel files and displays messages based on the file extension and
 * upload status.
 * @param langOption - The `langOption` parameter is a function that takes two arguments, one for the
 * text in Arabic and another for the text in English. It is used to provide language-specific text
 * based on the selected language option.
 * @param uploaded - The `uploaded` parameter in the `cacheFiles` function is an array that holds the
 * files that have been uploaded. It is used to keep track of the files that have already been uploaded
 * to avoid duplicates.
 * @param setUploaded - The `setUploaded` parameter is a function that is used to update the state of
 * uploaded files in the component. It is typically a state setter function provided by a React hook
 * like `useState`. When a new file is uploaded, this function is called to update the list of uploaded
 * files in the component
 * @param msgMaker - The `msgMaker` function is used to display messages to the user. It takes
 * parameters such as message type (e.g., "loading", "warning"), message content in different languages
 * based on the `langOption` function, icon type (e.g., "up" for upload icon), and
 * @param deleteMessage - The `deleteMessage` parameter in the `cacheFiles` function is a function that
 * is used to remove a specific message from the message list. It is called with the message type as an
 * argument to identify which message to delete.
 * @returns The `cacheFiles` function is returning an asynchronous function that takes an event `e` as
 * a parameter. Inside this function, it performs file validation and adds valid files to the
 * `uploaded` state using the `setUploaded` function. It also displays loading and warning messages
 * using the `msgMaker` function and removes the loading message using the `deleteMessage` function.
 */
export function cacheFiles(langOption, uploaded, setUploaded, msgMaker, deleteMessage) {
  return async (e) => {
    msgMaker("loading", langOption("جاري رفع الملفات", "Uploading files"), "up", 0);
    for (const file of e.target.files) {
      if (!file.name.includes("xls") && !file.name.includes("xlsx")) {
        msgMaker("warning", langOption("امتداد ملف غير مدعوم", "Unsupported file extension"));
        continue;
      }
      if (uploaded.some((f) => f.lastModified === file.lastModified)) continue;
      setUploaded((uploaded) => [...uploaded, file]);
    }
    deleteMessage("up");
  };
}
