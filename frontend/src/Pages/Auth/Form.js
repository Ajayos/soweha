import { useState } from "react";
import {
	Stack,
	IconButton,
	InputAdornment,
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import API from "../../utils/api";
import { login } from "../../utils/handleAuth";
export default function LoginForm() {
	// const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [isEx, setIsEx] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const validateForm = () => {
		let errors = {};
		let isValid = true;

		if (!formData.username) {
			isValid = false;
			errors.username = "Username is required";
		}

		if (!formData.password) {
			isValid = false;
			errors.password = "Password is required";
		}

		setErrors(errors);

		return isValid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateForm()) {
			setLoading(true);
			await API.post("/admin/v1/", {
				username: formData.username,
				password: formData.password,
			})
				.then((response) => {
					if (response.status === 200) {
                        console.log(response.data.data)
                        const { token, username, pic, id } = response.data.data;
						login(token, username, id, pic);
						enqueueSnackbar("Logged In successfully", {
							variant: "success",
						});
						setLoading(false);
                        window.location.href = "/dashboard";
					} else {
						if (response.status === 404) {
							setErrors({
								username: response.data.message,
							});
						} else if (response.status === 401) {
							setErrors({
								password: response.data.message,
							});
						} else {
							setErrors({
								username: response.data.message,
								password: response.data.message,
							});
						}

						enqueueSnackbar(response.data.message, { variant: "error" });
						setLoading(false);
					}
				})
				.catch((error) => {
					setLoading(false);
					if (error.response) {
						if (error.response.status === 404) {
							setErrors({
								username: error.response.data.message,
							});
						} else if (error.response.status === 401) {
							setErrors({
								password: error.response.data.message,
							});
						} else {
							setErrors({
								username: error.response.data.message,
								password: error.response.data.message,
							});
						}

						enqueueSnackbar(error.response.data.message, {
							variant: "error",
						});
					} else {
						setErrors({
							username: "An error occurred",
							password: "An error occurred",
						});
						enqueueSnackbar("An error occurred", { variant: "error" });
					}
				});
		}
	};

	return (
		<>
			<Stack spacing={2}>
				<Typography variant='body2' sx={{ color: "#f80202" }}>
					<br />{errors.username}
				</Typography>
				<FormControl>
					<InputLabel htmlFor='outlined-adornment-username-login'>
						{"Username"}
					</InputLabel>
					<OutlinedInput
						id='outlined-adornment-username-login'
						type='text'
						name='username'
						value={formData.username}
						onChange={handleInputChange}
						label={"Username"}
						error={!!errors.username}
						helperText={errors.username}
					/>
				</FormControl>

				<Typography variant='body2' sx={{ color: "#f80202" }}>
					{errors.password}
				</Typography>
				<FormControl>
					<InputLabel htmlFor='outlined-adornment-password-login'>
						{"Enter Password"}
					</InputLabel>
					<OutlinedInput
						id='outlined-adornment-password-login'
						type={showPassword ? "text" : "password"}
						name='password'
						color='primary'
						value={formData.password}
						onChange={handleInputChange}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
									size='large'
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
						label={"password"}
						error={!!errors.password}
						helperText={errors.password}
					/>
				</FormControl>
			</Stack>
			<Stack>
				<br />
				<LoadingButton
					fullWidth
					size='large'
					type='submit'
					variant='contained'
					disabled={loading}
					onClick={handleSubmit}
				>
					{loading && <>{"Loading..."}</>}
					{!loading && <>{"LOGIN"}</>}
				</LoadingButton>
			</Stack>
		</>
	);
}
