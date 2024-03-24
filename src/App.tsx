import "./styles/Global.min.css";
import { message } from "antd";
import AppNav from "./pages/general-components/AppNav";
import AppHome from "./pages/AppHome";
import AppScheduler from "./pages/AppScheduler";
import AppReview from "./pages/AppReview";
// biome-ignore lint/style/useImportType: <explanation>
import React, { ElementType, createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppFooter from "./pages/general-components/AppFooter";
import NotFound from "./pages/NotFound";
import AppLectures from "./pages/AppLectures";

export const ContextData = createContext<ContextDataType>({
  finalWorkbook: [],
  setFinalWorkbook: () => {},
  finalSchedule: [],
  setFinalSchedule: () => {},
  lang: "AR",
  setLang: () => {},
  langOption: (opt1, opt2) => opt1,
  msgMaker: (type, content, key = "", duration = 1) => {},
  deleteMessage: (key: string) => {},
});

type ContextDataType = {
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

export type Workbook = {
  subjectName: string;
  subjectCode: string;
  subjectYear: string;
  subjectTerm: string;
  conflictedSubjects: string[];
  studentsCount: number;
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

const App = () => {
  !localStorage.getItem("lang") && localStorage.setItem("lang", "AR");
  const [lang, setLang] = useState<"AR" | "EN" | null>(localStorage.getItem("lang") as "AR" | "EN" | null);
  const [finalWorkbook, setFinalWorkbook] = useState<Workbook[]>([]);
  const [finalSchedule, setFinalSchedule] = useState<Schedule[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const msgMaker: MessageMaker = (type, content, key = "", duration = 1) => {
    messageApi.open({
      key,
      type,
      content,
      duration,
    });
  };

  const deleteMessage = (key: string) => messageApi.destroy(key);

  function langOption<ElementType>(opt1: ElementType, opt2: ElementType) {
    return lang === "AR" ? opt1 : opt2;
  }

  const data: ContextDataType = {
    finalWorkbook,
    setFinalWorkbook,
    finalSchedule,
    setFinalSchedule,
    lang,
    setLang,
    langOption,
    msgMaker,
    deleteMessage,
  };

  useEffect(() => {
    document.documentElement.lang = lang !== null ? lang.toLowerCase() : "ar";
  }, [lang]);

  return (
    <ContextData.Provider value={data}>
      {contextHolder}
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route index element={<AppHome />} />
          <Route path="/scheduler" element={<AppScheduler />} />
          <Route path="/classrooms" element={<AppLectures />} />
          <Route path="/reviewer" element={<AppReview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </ContextData.Provider>
  );
};

export default App;
