import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSideBar from "../../../hooks/useSideBar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useResponsive from "../../../hooks/useResponsive";

export default function SideBar() {
  const isDesktop = useResponsive("up", "lg");
  const { drawer, sideBar, setDrawer, open, Collapse } = useSideBar();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sideBar) {
      if (drawer || (!drawer && !isDesktop)) {
        setIsDrawer(true);
        if (open) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } else {
        setIsDrawer(false);
      }
    } else {
      setIsDrawer(false);
    }
  }, [drawer, sideBar, open, isDesktop, setDrawer]);

  useEffect(() => {
    setDrawer(isDesktop ? false : true);
  }, [isDesktop, setDrawer]);

  if (isDrawer) {
    return (
      <IconButton onClick={() => Collapse()}>
        {isOpen ? <ChevronLeftIcon /> : <MenuOutlinedIcon />}
      </IconButton>
    );
  } else {
    return false;
  }
}
