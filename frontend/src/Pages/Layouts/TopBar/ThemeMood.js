import { useContext } from "react";
import { IconButton, useTheme } from "@mui/material";
import { ModeContext } from "../../../hooks/useTheme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const SearchBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ModeContext);

  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <DarkModeOutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
  );
};

export default SearchBar;
