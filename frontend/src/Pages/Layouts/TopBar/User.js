import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import LoginIcon from "@mui/icons-material/Login";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const User = () => {
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
          <LoginIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </>
    );
  }
};

export default User;
