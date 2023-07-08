import { useEffect, useState } from "react";
import useSideBar from "../../../hooks/useSideBar";
import Drawer from "./Drawer";
import SideBars from "./SideBar";

export default function SideBar() {
  const { sideBar, open, drawer } =
    useSideBar();
  const [isSideBar, setIsSideBar] = useState(false);

  // const [isOpen, setIsOpen] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  useEffect(() => {
    setIsSideBar(sideBar ? true : false);
    setIsDrawer(drawer ? true : false);
    // setIsOpen(open ? true : false);
  }, [sideBar, open, drawer]);

  if (!isSideBar) {
    return false;
  } else {
    if (isDrawer) {
      return <Drawer />;
    } else {
      return <SideBars />;
    }
  }
}
