import { utils } from "xlsx";

type TempEntries = [string, { w: string }];

export const getCell = (sheet: object, searchPoint: string, switchStand = "") => {
  let temp: TempEntries;
  //Is switchStand is "include"
  if (switchStand === "include") {
    //Yes? then filter the sheet to get the cell that includes the searchPoint
    temp = Object.entries(sheet)
      .filter((e) => e[1].w !== undefined)
      .find((s) => s[1].w.includes(searchPoint)) ?? ["", { w: "" }];
  } else {
    //No? then get the cell that equals the searchPoint
    temp = Object.entries(sheet).find((e) => e[1].w === searchPoint) ?? ["", { w: "" }];
  }

  //Turn the cell address into a (number)
  let colNumber = utils.decode_cell(temp[0]);

  try {
    //Return the the row (number) and column address (Letter)
    return { row: utils.decode_cell(temp[0]).r + 1, col: utils.encode_col(colNumber.c) };
  } catch (err) {
    //If the column is -1 that mean's the sheet end is not in this sheet so reset colNumber to 0
    if (colNumber.r === -1 || colNumber.c === -1) colNumber = { r: 0, c: 0 };
    //Return the 200 as the row (hopefully a very high number that isn't in the sheet which acts as a key to be checked for in studentArrayManager)
    return { row: 200, col: utils.encode_col(colNumber.c) };
  }
};

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
