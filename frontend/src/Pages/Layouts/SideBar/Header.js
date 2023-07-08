import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  Avatar,
  Badge,
  Button,
  Popover,
  styled,
  Typography,
} from "@mui/material";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const [is, setIs] = useState(true);
  const [isUser, setIsUser] = useState({
    name: "Ajay o s",
    email: "ajayos@gmail.com",
    status: "😍",
    pic: "https://github.com/Ajayos.png",
    online: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      setIs(true);
      setIsUser({
        name: user["name"],
        email: user["email"],
        status: user["status"],
        pic: user["pic"],
      });
    } else {
      setIs(false);
    }
  }, [isAuthenticated, user]);

  // eslint-disable-next-line
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isUser.online ? "green" : "transparent",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      top: 0,
      left: 0,
      transform: "translate(-50%, -50%)",
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  if (is) {
    return (
      <div>
        <Button onClick={handleClick}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={isUser["name"]} src={isUser["pic"]} />
          </StyledBadge>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", padding: "10px" }}
          >
            <img
              src={isUser["pic"]}
              alt={isUser["name"]}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <Typography variant="subtitle1">{isUser["name"]}</Typography>
              <Typography variant="body2">{isUser["email"]}</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: isUser.online ? "green" : "transparent",
                      marginRight: "4px",
                    }}
                  />
                  <Typography variant="caption">
                    {isUser.online ? "Online" : "Offline"}
                  </Typography>
                </div>
                <Typography variant="caption">{isUser.status}</Typography>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  } else {
    return false;
  }
}
