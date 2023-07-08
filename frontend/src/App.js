import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { EmpDetail } from "./Pages/EmpDetail";
import { ManagerDetail } from "./Pages/ManagerDetail";
import { DeptDetail } from "./Pages/DeptDetailDetail";
import { Promote } from "./Pages/Promote";
import { AddEmp } from "./Pages/AddEmp";
import { Home } from "./Pages/Home";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={< EmpDetail/>} />
              <Route path="/contacts" element={<ManagerDetail />} />
              <Route path="/login" element={<DeptDetail/>} />
              <Route path="/bookInfo" element={<Promote/>} />
              <Route path="/bookInfo" element={<AddEmp/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
