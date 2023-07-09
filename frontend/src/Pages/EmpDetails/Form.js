import React, { useEffect, useState } from "react";
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Paper,
	Typography,
	Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import API from "../../utils/api";

const AddEmployeeForm = (props) => {
	const { enqueueSnackbar } = useSnackbar();
	const [employeeDetails, setEmployeeDetails] = useState({
		name: "",
		email: "",
		contactNumber: "",
		dateOfJoining: "",
		yearsOfExperience: "",
		age: "",
		dateOfBirth: "",
		department: "",
	});
	const [dep, setDep] = useState([]);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(null);
	const [isExperienced, setIsExperienced] = useState(false);

	const validateForm = () => {
		let errors = {};
		let isValid = true;

		// Validate form fields
		if (!employeeDetails.name) {
			isValid = false;
			errors.name = "Name is required";
		}

		if (!employeeDetails.email) {
			isValid = false;
			errors.email = "Email is required";
		}

		if (!employeeDetails.contactNumber) {
			isValid = false;
			errors.contactNumber = "Contact Number is required";
		}

		if (!employeeDetails.dateOfJoining) {
			isValid = false;
			errors.dateOfJoining = "Date of Joining is required";
		}

		if (!employeeDetails.yearsOfExperience) {
			isValid = false;
			errors.yearsOfExperience = "Years of experience is required";
		}

		if (!employeeDetails.dateOfBirth) {
			isValid = false;
			errors.dateOfBirth = "Date of birth is required";
		}

		if (!employeeDetails.age) {
			isValid = false;
			errors.age = "Age is required";
		}

		if (!employeeDetails.department) {
			isValid = false;
			errors.department = "Department is required";
		}

		setErrors(errors);

		return isValid;
	};

	const calculateAge = (dob) => {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}
		return age;
	};

	const fetchData = async () => {
		try {
			const res = await API.get("/department/v1");
			setDep(res.data.data);
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	useEffect(() => {
		fetchData();
		if (props && props.id) {
			setId(props.id);
		}
	}, [props]);

	useEffect(() => {
		if (id) {
			const fetchEmployeeData = async () => {
				try {
					const res = await API.get(`/employee/v1/${id}`);
					const employeeData = res.data.data;
					setEmployeeDetails({
						name: employeeData.name,
						email: employeeData.email,
						contactNumber: employeeData.phoneNumber,
						dateOfJoining: employeeData.dateOfJoining.split("T")[0],
						yearsOfExperience: employeeData.yearsOfExperience,
						age: employeeData.age,
						dateOfBirth: employeeData.dob,
						department: employeeData.department._id,
					});
				} catch (error) {
					console.log("Error: ", error);
				}
			};

			fetchEmployeeData();
		}
	}, [id]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setEmployeeDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));

		if (name === "dateOfBirth") {
			const age = calculateAge(value);
			setEmployeeDetails((prevDetails) => ({
				...prevDetails,
				age: age.toString(),
			}));
		}
	};

	

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateForm()) {
			setLoading(true);

			const apiUrl = id ? `/employee/v1/${id}` : "/employee/v1";

			const requestData = {
				name: employeeDetails.name,
				email: employeeDetails.email,
				phoneNumber: employeeDetails.contactNumber,
				dateOfJoining: employeeDetails.dateOfJoining,
				yearsOfExperience: employeeDetails.yearsOfExperience,
				dob: employeeDetails.dateOfBirth,
				age: employeeDetails.age,
				department: employeeDetails.department,
			};

			const apiMethod = id ? API.put : API.post;

			apiMethod(apiUrl, requestData)
				.then((res) => {
					if (res.status === 200) {
						enqueueSnackbar("Employee added successfully", {
							variant: "success",
						});
						setLoading(false);
						setEmployeeDetails({
							name: "",
							email: "",
							contactNumber: "",
							dateOfJoining: "",
							yearsOfExperience: "",
							dateOfBirth: "",
							department: "",
							age: "",
						});
						window.location.reload();
					} else {
						enqueueSnackbar(res.data.message, {
							variant: "error",
						});
					}
				})
				.catch((error) => {
					enqueueSnackbar("Something went wrong", {
						variant: "error",
					});
				});
			setLoading(false);
		} else {
			enqueueSnackbar("Please fill all the fields", {
				variant: "error",
			});
			setLoading(false);
		}
	};

	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			style={{ height: "90vh" }}
		>
			<Grid item xs={12} sm={8} md={6} lg={4}>
				<Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
					<Typography variant='h5' sx={{ marginBottom: "16px" }}>
						{id ? "Update Employee" : "Add Employee"}
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label='Name'
							name='name'
							value={employeeDetails.name}
							error={!!errors.name}
							helperText={errors.name}
							onChange={handleChange}
							required
							fullWidth
							sx={{ marginBottom: "16px" }}
						/>

						<TextField
							label='Email'
							name='email'
							type='email'
							value={employeeDetails.email}
							error={!!errors.email}
							helperText={errors.email}
							onChange={handleChange}
							required
							fullWidth
							sx={{ marginBottom: "16px" }}
						/>

						<TextField
							label='Contact Number'
							name='contactNumber'
							type='tel'
							error={!!errors.contactNumber}
							helperText={errors.contactNumber}
							value={employeeDetails.contactNumber}
							onChange={handleChange}
							required
							fullWidth
							sx={{ marginBottom: "16px" }}
						/>

						<TextField
							label='Date of Joining'
							name='dateOfJoining'
							type='date'
							value={employeeDetails.dateOfJoining}
							error={!!errors.dateOfJoining}
							helperText={errors.dateOfJoining}
							onChange={handleChange}
							required
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
							sx={{ marginBottom: "16px" }}
						/>

						<TextField
							label='Years of Experience'
							name='yearsOfExperience'
							type='number'
							value={employeeDetails.yearsOfExperience}
							error={!!errors.yearsOfExperience}
							helperText={errors.yearsOfExperience}
							onChange={handleChange}
							fullWidth
							sx={{ marginBottom: "16px" }}
						/>

						<Stack direction='row' spacing={1} sx={{ marginBottom: "16px" }}>
							<TextField
								label='Date of Birth'
								name='dateOfBirth'
								type='date'
								value={employeeDetails.dateOfBirth}
								error={!!errors.dateOfBirth}
								helperText={errors.dateOfBirth}
								onChange={handleChange}
								required
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
							<TextField
								label='Age'
								name='age'
								type='number'
								value={employeeDetails.age}
								error={!!errors.age}
								helperText={errors.age}
								onChange={handleChange}
								required
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Stack>

						<FormControl fullWidth sx={{ marginBottom: "16px" }}>
							<InputLabel>Department</InputLabel>
							<Select
								name='department'
								value={employeeDetails.department}
								error={!!errors.department}
								helperText={errors.department}
								onChange={handleChange}
								required
							>
								{dep.map((item) => (
									<MenuItem key={item._id} value={item._id}>
										{item.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

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
								{loading ? "Loading..." : "Submit"}
							</LoadingButton>
						</Stack>
					</form>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default AddEmployeeForm;
