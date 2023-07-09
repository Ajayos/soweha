import { useState, createContext, useEffect } from "react";
import useResponsive from "../hooks/useResponsive";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const SideBarContext = createContext({});

export default function SideBarProvider({ children }) {
  const isDesktop = useResponsive("up", "lg");

  const [sideBar, setSideBar] = useState(true);
  const [open, close] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [contents, setContents] = useState({
    id: 0,
    title: "Head",
    icon: <DashboardIcon />,
    to: "home",
  });

  useEffect(() => {
    if (isDesktop) {
      setIsDrawer(false);
    } else {
      setIsDrawer(true);
    }
  }, [isDesktop]);
  const Collapse = () => {
    close(!open);
  };
  return (
    <SideBarContext.Provider
      value={{
        sideBar,
        setSideBar,
        open,
        close,
        drawer,
        setDrawer,
        Collapse,
        isDrawer,
        contents,
        setContents,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

