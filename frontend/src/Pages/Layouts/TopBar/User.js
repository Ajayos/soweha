import { useEffect, useState } from "react";
import { IconButton, Avatar } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import LoginIcon from "@mui/icons-material/Login";
import { logout } from "../../../utils/handleAuth";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const User = () => {
	const { isAuthenticated, user } = useAuth();
	const [Is, setIs] = useState(false);
	const [isUser, setIsUser] = useState({
		username: "",
		pic: "",
		online: true,
	});

	useEffect(() => {
		if (isAuthenticated) {
			setIs(true);
			setIsUser({
				username: user["username"],
				pic: user["pic"],
			});
		} else {
			setIs(false);
		}
	}, [isAuthenticated, user]);

	if (!Is) {
		return (
			<>
				<IconButton onClick={() => (window.location.href = "/login")}>
					<LoginIcon />
				</IconButton>
			</>
		);
	} else {
		return (
			<>
				<IconButton onClick={() => logout()}>
					<Avatar alt={isUser["username"]} src={isUser["pic"]} />
				</IconButton>
			</>
		);
	}
};

export default User;
