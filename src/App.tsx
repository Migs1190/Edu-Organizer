import "./styles/Global.min.css";
import { message } from "antd";
import AppNav from "./components/general/AppNav";
import AppHome from "./pages/AppHome";
import AppScheduler from "./pages/AppScheduler";
import AppReview from "./pages/AppReview";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppFooter from "./components/general/AppFooter";
import NotFound from "./pages/NotFound";
import AppLectures from "./pages/AppLectures";
import type { ContextDataType, MessageMaker, Schedule, Workbook } from "./types";

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
