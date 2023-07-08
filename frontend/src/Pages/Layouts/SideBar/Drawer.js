import { useEffect, useState } from "react";
import { Drawer, Box, IconButton, useTheme } from "@mui/material";
import {
  ProSidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import colors from "../../../Theme/colors";
import useSideBar from "../../../hooks/useSideBar";
import "react-pro-sidebar/dist/css/styles.css";
import Inside from "./Inside";

export default function DrawerPart() {
  const { open, close } = useSideBar();
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(open ? true : false);
  }, [open, close]);

  return (
    <>
      <Drawer open={isCollapsed} onClose={() => close(false)}>
        <Box
          sx={{
            "& .pro-sidebar .pro-menu": {
              paddingTop: "10px",
              paddingBottom: "250%",
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
            collapsed={false}
            image={
              "https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
            }
          >
            <Menu iconShape="round">
              <MenuItem
                onClick={() => close(false)}
                icon={isCollapsed ? <ChevronLeftIcon /> : undefined}
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
                    <IconButton onClick={() => close(false)}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              <Inside />
            </Menu>
          </ProSidebar>
        </Box>
      </Drawer>
    </>
  );
}
