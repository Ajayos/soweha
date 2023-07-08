import React, { useState } from "react";

import TopBar from "../TopBar";
import TB from "../TopBar/index";
import SideBar from "./Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../components/theme";

export default function Bar() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  return (
    <>
      <TB setIsSidebar={setIsSidebar} />
      <SideBar isSidebar={isSidebar} />
    </>
  );
}
