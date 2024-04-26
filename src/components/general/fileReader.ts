import { read, utils } from "xlsx";
import type { Sheet, SheetValues } from "../../types";
import type { WorkSheetMap } from "../../pages/AppLectures";

export const readSingleFile = async (file: File) => {
	const ab = await file.arrayBuffer();
	const wb = read(ab);
	const ws = wb.Sheets[wb.SheetNames[0]];

	//Transform into col-row format
	const wsColRow: WorkSheetMap = new Map();
	const ref = ws["!ref"] as unknown as string;
	const endPoint = ref.split(":")[1];
	const endCol = utils.decode_cell(endPoint).c; //Number
	const endRow = utils.decode_cell(endPoint).r; //Number
	const startCol = utils.decode_col("C"); //Number
	const startRow = 2; //Number

	let currentValue: SheetValues;
	for (let col = startCol; col <= endCol; col++) {
		for (let row = startRow; row <= endRow; row++) {
			const currentAddress = utils.encode_cell({ c: col, r: row });
			currentValue = Object.keys(ws).includes(currentAddress) ? ws[currentAddress] : { t: "", r: "", h: "", w: "", v: "empty" };

			wsColRow.set(currentAddress, currentValue);
		}
	}
	return wsColRow;
};

export const readMultiFiles = async (files: File[]) => {
	return Promise.all(
		files.map(async (file: File) => {
			const ab = await file.arrayBuffer();
			const wb = read(ab);
			return {
				infoSheet: wb.Sheets[wb.SheetNames[0]] as Sheet,
				studentsSheet1: wb.Sheets[wb.SheetNames[1]] as Sheet,
				studentsSheet2: wb.Sheets[wb.SheetNames[2]] as Sheet,
			};
		}),
	);
};
