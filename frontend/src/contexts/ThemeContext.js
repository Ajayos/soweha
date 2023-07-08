import React, { createContext, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ModeContext, useTheme } from "../hooks/useTheme";
import Sidebar from "../Pages/Layouts/SideBar";
import Topbar from "../Pages/Layouts/TopBar";
export const ThemeContext = createContext("");

export default function ThemeProviderContext({ children }) {
  const [theme, colorMode] = useTheme();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ThemeContext.Provider value={{ isSidebar, setIsSidebar }}>
      <ModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ModeContext.Provider>
    </ThemeContext.Provider>
  );
}
