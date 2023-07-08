import { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, useTheme } from "@mui/material";
import colors from "../../../Theme/colors";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import useSideBar from "../../../hooks/useSideBar";
import Inside from "./Inside";

export default function SideBar() {
  const { open, close, Collapse } = useSideBar();
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(open ? false : true);
  }, [open, close]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${color.primary[800]} !important`,
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
      <ProSidebar
        collapsed={isCollapsed}
        image={
          "https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        }
      >
        <Menu iconShape="round">
          <MenuItem
            onClick={Collapse}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: color.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="0px"
              >
                <IconButton onClick={Collapse}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Inside />
        </Menu>
      </ProSidebar>
    </Box>
  );
}
