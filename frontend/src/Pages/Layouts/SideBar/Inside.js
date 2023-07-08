import { Box, Divider, Typography, useTheme } from "@mui/material";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import colors from "../../../Theme/colors";
import Header from "./Header";
import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AppsIcon from "@mui/icons-material/Apps";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";

export default function Inside() {
  // eslint-disable-next-line
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  // const location = useLocation();
  // const [imageInside, setImageInside] = useState(undefined);

  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const color = colors(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: color.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  return (
    <>
      <Divider />
      <Header />
      <Divider />
      <Box paddingLeft={isCollapsed ? undefined : "0%"}>
        <Item
          title="Dashboard"
          to="/"
          icon={<DashboardIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Employee Details"
          to="/empdetails"
          icon={<BadgeIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Manager Details"
          to="/managerdetails"
          icon={<ManageAccountsIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Department Details"
          to="/deptdetails"
          icon={<AccountBalanceIcon />}
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
    </>
  );
}
