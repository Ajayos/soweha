import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const Notification = () => {
    const { isAuthenticated } = useAuth();
     const [Is, setIs] = useState(false);
  
   useEffect(() => {
    if (isAuthenticated) {
      setIs(true);
    } else {
      setIs(false);
    }
  }, [isAuthenticated]);
  
  if (!Is) {
      return (
          <>
          <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
          </>
      );
  } else {
      return (
          <>
          <IconButton>
          <NotificationsOutlinedIcon sx={{color: "red"}} />
        </IconButton>
          </>
      );
  }
};

export default Notification;     