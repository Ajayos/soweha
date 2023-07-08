import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import ThemeMood from "./ThemeMood";
import Notification from "./Notification";
import User from "./User";
import SideBar from "./SideBar";

const Topbar = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={1}>
      <SideBar />
      <SearchBar />

      <Box display="flex">
        <ThemeMood />
        <Notification />
        <User />
      </Box>
    </Box>
  );
};

export default Topbar;
