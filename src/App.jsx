import "./styles/Global.min.css";
import { message } from "antd";
import AppNav from "./pages/general-components/AppNav";
import AppHome from "./pages/AppHome";
import AppScheduler from "./pages/AppScheduler";
import AppReview from "./pages/AppReview";
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppFooter from "./pages/general-components/AppFooter";
import DateRangePicker from "./new";
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

  const data = {
    finalWorkbook,
    setFinalWorkbook,
    finalSchedule,
    setFinalSchedule,
    lang,
    setLang,
    msgMaker,
    deleteMessage,
  };
  return (
    <ContextData.Provider value={data}>
      {contextHolder}
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route index element={<AppHome lang={lang} />} />
          <Route path="/scheduler" element={<AppScheduler />} />
          <Route path="/reviewer" element={<AppReview />} />
          {/* <Route path="*" element={<p>hey</p>} /> */}
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </ContextData.Provider>
  );
};

export default App;
