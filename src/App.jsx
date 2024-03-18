import "./styles/Global.min.css";
import { message } from "antd";
import AppNav from "./pages/general-components/AppNav";
import AppHome from "./pages/AppHome";
import AppScheduler from "./pages/AppScheduler";
import AppReview from "./pages/AppReview";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppFooter from "./pages/general-components/AppFooter";
import NotFound from "./pages/NotFound";
export const ContextData = createContext();

const App = () => {
  !localStorage.getItem("lang") && localStorage.setItem("lang", "AR");
  const [lang, setLang] = useState(localStorage.getItem("lang"));
  const [finalWorkbook, setFinalWorkbook] = useState([]);
  const [finalSchedule, setFinalSchedule] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const msgMaker = (type, content, key = "", duration = 1) => {
    messageApi.open({
      key,
      type,
      content,
      duration,
    });
  };

  const deleteMessage = (key) => messageApi.destroy(key);

  const langOption = (opt1, opt2) => {
    return lang === "AR" ? opt1 : opt2;
  };
  const data = {
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
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  return (
    <ContextData.Provider value={data}>
      {contextHolder}
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route index element={<AppHome />} />
          <Route path="/scheduler" element={<AppScheduler />} />
          <Route path="/reviewer" element={<AppReview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </ContextData.Provider>
  );
};

export default App;
