import { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import color from "../../../Theme/colors";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AppsIcon from "@mui/icons-material/Apps";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = color(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar_ = () => {
  const theme = useTheme();
  const colors = color(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const location = useLocation();
  const [imageInside, setImageInside] = useState(undefined);
  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return null;
  }
    // if(theme.palette.mode === "dark" ) {
    //   setImageInside("https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg")
    // } else {
    //   setImageInside(undefined);
    // }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[800]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}  image={imageInside}>
        <Menu iconShape="round">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="0px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Projects"
              to="/projects"
              icon={<AppsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Repo"
              to="/contacts"
              icon={<AutoAwesomeMosaicIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Auther"
              to="/contacts"
              icon={<PersonPinIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu label="Charts">
              <MenuItem icon={<PersonPinIcon />}> Pie charts </MenuItem>
              <MenuItem icon={<BarChartOutlinedIcon />}> Line charts </MenuItem>
            </SubMenu>
            <MenuItem icon={<TimelineOutlinedIcon />}> Documentation </MenuItem>
            <MenuItem icon={<PersonPinIcon />}> Calendar </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar_;
