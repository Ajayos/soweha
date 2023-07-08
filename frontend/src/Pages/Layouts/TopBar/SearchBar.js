import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import colors from "../../../Theme/colors";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box
      display="flex"
      backgroundColor={color.primary[400]}
      borderRadius="3px"
    >
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
