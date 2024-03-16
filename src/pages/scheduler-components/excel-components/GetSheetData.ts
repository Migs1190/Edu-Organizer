import { utils } from "xlsx";

/**
 * The function `getCol` takes a sheet object, a search point, and an optional switch stand parameter
 * to find and return the column of a specific value in the sheet.
 * @param {object} sheet - The `sheet` parameter is an object that represents a spreadsheet.
 * @param {string} searchPoint - The `searchPoint` parameter is the value you are searching for within
 * the `sheet` object.
 * @param [switchStand] - The `switchStand` parameter in the `getCol` function is used to determine how
 * the search for the `searchPoint` should be conducted. If `switchStand` is set to "include", the
 * function will search for `searchPoint` within the values of the cells in the sheet.
 * @returns The `getCol` function returns the column of the cell that contains the `searchPoint` value
 * in the provided `sheet` object.
 */
export const getCol = (sheet: object, searchPoint: string, switchStand = "") => {
  const temp =
    switchStand === "include"
      ? Object.entries(sheet)
          .filter((e) => e[1].w !== undefined)
          .find((s) => s[1].w.includes(searchPoint))
      : Object.entries(sheet).find((e) => e[1].w === searchPoint);
  if (temp !== undefined) {
    const final = utils.decode_cell(temp[0]);
    return utils.encode_col(final.c);
  }
};

/**
 * The function `getRow` searches for a specific value in a given object and returns the row number
 * where the value is found.
 * @param {object} sheet - The `sheet` parameter is an object that represents a spreadsheet. It likely
 * contains data in a tabular format, with rows and columns. The function `getRow` is designed to
 * search for a specific value within this spreadsheet and return the row number where that value is
 * found.
 * @param {string} searchPoint - The `searchPoint` parameter is the value that you are searching for
 * within the given `sheet`. It could be a specific string or value that you want to find within the
 * sheet data.
 * @param [switchStand] - The `switchStand` parameter in the `getRow` function is used to determine how
 * the search for the `searchPoint` should be conducted. If `switchStand` is set to "include", the
 * function will search for the `searchPoint` within the values of the cells in the sheet.
 * @returns the row number of the cell that contains the `searchPoint` value in the given `sheet`
 * object. If the `switchStand` parameter is set to "include", it will search for cells that include
 * the `searchPoint` value. If a matching cell is found, the function will return the row number of
 * that cell plus 1. If no matching cell is found
 */
export const getRow = (sheet: object, searchPoint: string, switchStand = "") => {
  try {
    const temp =
      switchStand === "include"
        ? Object.entries(sheet)
            .filter((e) => e[1].w !== undefined)
            .find((s) => s[1].w.includes(searchPoint))
        : Object.entries(sheet).find((e) => e[1].w === searchPoint);
    if (temp !== undefined) return utils.decode_cell(temp[0]).r + 1;
  } catch (err) {
    return 200;
  }
};

/**
 * This TypeScript function takes a subject name code as input, extracts relevant information such as
 * name, code, year, and term, and returns it in an object.
 * @param {string} subjectNameCode - The `getSlices` function takes a `subjectNameCode` parameter,
 * which is expected to be a string containing information about a subject. The subjectNameCode is
 * split by newline characters to extract different parts of the subject information.
 * @returns The function `getSlices` returns an object with the properties `name`, `code`, `year`, and
 * `term`.
 */
export const getSlices = (subjectNameCode: string) => {
  const subjectSlices = subjectNameCode.split("\n");

  //Eliminating whiteSpaces
  const code = subjectSlices[1].replace(/ /g, "");

  //Getting The Code, Year, Term From The Subject Code
  let index = 0;
  for (let i = 0; i < code.length; i++) {
    // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
    if (!isNaN(+code[i])) {
      index = i;
      break;
    }
  }

  const term = code.substring(index + 1, index + 2);
  return {
    name: subjectSlices[0],
    code,
    year: code.substring(index, index + 1),
    term: term === "0" || code.length === 5 ? "-" : term,
  };
};
