/**
 * The cacheFiles function uploads Excel files, displays loading messages in different languages, and
 * handles unsupported file extensions.
 * @param lang - The `lang` parameter is used to determine the language setting for the messages
 * displayed during the file upload process. It can be either "AR" for Arabic or any other value for a
 * different language.
 * @param uploaded - The `uploaded` parameter is an array that contains the files that have already
 * been uploaded.
 * @param setUploaded - The `setUploaded` parameter is a function that is used to update the state of
 * uploaded files in the component. In the `cacheFiles` function, it is called with the new array of
 * files after processing the uploaded files. This function is typically provided by a parent component
 * using React's state management
 * @param msgMaker - The `msgMaker` function is used to display messages to the user during the file
 * caching process. It takes parameters such as the message type (e.g., "loading", "warning"), the
 * message content (in different languages based on the `lang` parameter), an icon for the message
 * display,
 * @param deleteMessage - The `deleteMessage` parameter in the `cacheFiles` function is a function that
 * is used to remove a specific message from the message list. It is called with the message ID as a
 * parameter to identify which message should be deleted.
 * @returns The `cacheFiles` function is returning an asynchronous function that takes an event `e` as
 * a parameter. Inside this function, it performs the following actions:
 * 1. Calls the `msgMaker` function to display a loading message based on the selected language.
 * 2. Iterates over the files in the event target.
 * 3. Checks if the file extension is supported (xls or xlsx). If
 */
export function cacheFiles(lang, uploaded, setUploaded, msgMaker, deleteMessage) {
  return async (e) => {
    msgMaker("loading", lang === "AR" ? "جاري رفع الملفات" : "Uploading files", "up", 0);
    for (const file of e.target.files) {
      if (!file.name.includes("xls") && !file.name.includes("xlsx")) {
        msgMaker("warning", lang === "AR" ? "امتداد ملف غير مدعوم" : "Unsupported file extension");
        continue;
      }
      if (uploaded.some((f) => f.lastModified === file.lastModified)) continue;
      setUploaded((uploaded) => [...uploaded, file]);
    }
    deleteMessage("up");
  };
}
