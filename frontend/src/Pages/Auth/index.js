import { useEffect } from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";

import Form from "./Form";
import useAuth from "../../hooks/useAuth";
import useHelmet from "../../hooks/useHelmet";
import useSideBar from "../../hooks/useSideBar";
import colors from "../../Theme/colors";

export default function SignIn() {
	const { isAuthenticated } = useAuth();
	const { setTitle } = useHelmet();
	const theme = useTheme();
	const color = colors(theme.palette.mode);
	const { setSideBar } = useSideBar();

	useEffect(() => {
		if (isAuthenticated) {
			window.location.href = "/dashboard";
		}
		setTitle("Sign In");
		setSideBar(false);
	}, [setTitle, setSideBar, isAuthenticated]);

	return (
		<Container component='main' maxWidth='sm'>
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: "flex",
					backgroundColor: color.grey[900],
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<Form />
			</Box>
		</Container>
	);
}
