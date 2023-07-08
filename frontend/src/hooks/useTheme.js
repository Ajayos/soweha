import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import ThemeSettings from "../Theme";

export const ModeContext = createContext({
  toggleColorMode: () => {},
});

export const useTheme = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(ThemeSettings(mode)), [mode]);
  return [theme, colorMode];
};
