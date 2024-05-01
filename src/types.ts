import type { Dayjs } from "dayjs";

export type Workbook = {
	subjectName: string;
	subjectCode: string;
	subjectYear: string;
	subjectTerm: string;
	conflictedSubjects: string[];
	enrolledStudents: {
		name: string;
		id: string;
		year: string;
		dep: string;
	}[];
};
export type Schedule = {
	day: {
		ar: string;
		en: string;
	};
	dayNum: {
		ar: string;
		en: string;
	};
	month: {
		ar: string;
		en: string;
	};
	year: {
		ar: string;
		en: string;
	};
	fullDate: {
		ar: string;
		en: string;
	};
	flagged: boolean;
};

export type ContextDataType = {
	finalWorkbook: Workbook[];
	setFinalWorkbook: React.Dispatch<React.SetStateAction<Workbook[]>>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	finalSchedule: any[];
	setFinalSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>;
	lang: "AR" | "EN" | null;
	setLang: React.Dispatch<React.SetStateAction<"AR" | "EN" | null>>;
	langOption: LangOption;
	msgMaker: MessageMaker;
	deleteMessage: (key: string) => void;
};

type MsgType = "success" | "error" | "info" | "warning" | "loading";
export type MessageMaker = (type: MsgType, content: string, key?: string, duration?: number) => void;

export type LangOption = <ElementType>(opt1: ElementType, opt2: ElementType) => ElementType;

export type Sheet = {
	[key: string]: SheetValues;
};
export type SheetValues = {
	t: string;
	v: string;
	r: string;
	h: string;
	w: string;
};
export type SheetCollection = {
	infoSheet: Sheet;
	studentsSheet1: Sheet;
	studentsSheet2: Sheet;
};

export type Range = [Dayjs | null, Dayjs | null] | null;

export type TimeTable = Schedule & {
	Period1: Workbook[];
	Period2: Workbook[];
};
export type SavedTimeTable = {
	content: TimeTable[];
	dateAr: string[];
	dateEn: string[];
};
