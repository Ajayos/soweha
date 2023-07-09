import React, { useState, useEffect } from "react";
import {
	IconButton,
	Card,
	Modal,
	Box,
	Skeleton,
	Button,
	Stack,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { format } from "date-fns";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSnackbar } from "notistack";
import useHelmet from "../../hooks/useHelmet";
import API from "../../utils/api";

const EmployeeContainer = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { setTitle } = useHelmet();
	const [emp, setEmp] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectId, setSelectId] = useState(null);
	const [eligibleForPromotion, setEligibleForPromotion] = useState(false);
	const [demoteToEmployee, setDemoteToEmployee] = useState(false);

	function fDate(date, newFormat) {
		const fm = newFormat || "dd MMM yyyy";

		return date ? format(new Date(date), fm) : "";
	}

	const fetchData = async () => {
		try {
			const res = await API.get("/employee/v1/");
			const currentYear = new Date().getFullYear();
			const em = res.data.data
				.map((emp) => {
					const yearOfJoining = new Date(emp.dateOfJoining).getFullYear();
					const yearsOfExperience = emp.yearsOfExperience;
					const experience = yearOfJoining - currentYear + yearsOfExperience;
					const isEligibleForPromotion = yearsOfExperience >= 5;
					const isManager = emp.role === "Manager";
					if (isManager) {
						return {
							id: emp._id,
							username: emp.name,
							email: emp.email,
							phoneNumber: emp.phoneNumber,
							role: emp.role,
							department: emp.department.name,
							dateOfJoining: emp.dateOfJoining,
							yearsOfExperience: emp.yearsOfExperience,
							experience: experience,
							isEligibleForPromotion: isEligibleForPromotion,
							isManager: isManager,
						};
					} else {
						return null;
					}
				})
				.filter((emp) => emp !== null);
			setEmp(em);
			setIsLoading(false);
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	useEffect(() => {
        setTitle("Manager Details");
		fetchData();
	}, []);

	const handleViewDetails = (id) => {
		setEligibleForPromotion(id);
		setSelectId(id);
		setOpenModal(true);
	};
	const handleViewDetailsD = (id) => {
		setDemoteToEmployee(id);
		setSelectId(id);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setEligibleForPromotion(null);
		setDemoteToEmployee(null);
		setSelectId(null);
	};

	const handlePromoteEmployee = async () => {
		try {
			const res = await API.put(`/employee/v1/${selectId}/promote`);
			if (res.status === 200) {
				// Reload the data
				setOpenModal(false);
				setSelectId(null);
				setEligibleForPromotion(null);
				setDemoteToEmployee(null);
				setIsLoading(true);
				fetchData();
			} else {
				// Handle error
				console.log("Error: ", res.data.message);
			}
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	const handleDemoteToEmployee = async () => {
		try {
			const res = await API.put(`/employee/v1/${selectId}/demote`);
			if (res.status === 200) {
				// Reload the data
				setOpenModal(false);
				setSelectId(null);
				setEligibleForPromotion(null);
				setDemoteToEmployee(null);
				setIsLoading(true);
				fetchData();
			} else {
				// Handle error
				enqueueSnackbar(res.data.message, {
					variant: "error",
				});
				console.log("Error: ", res.data.message);
			}
		} catch (error) {
			enqueueSnackbar(error, {
				variant: "error",
			});
			console.log("Error: ", error);
		}
	};

	const columns = [
		{
			field: "username",
			headerName: "Name",
			flex: 1,
		},
		{ field: "email", headerName: "Email", flex: 1 },
		{ field: "phoneNumber", headerName: "Phone number", flex: 1 },
		{ field: "role", headerName: "Role", flex: 1 },
		{ field: "department", headerName: "Department", flex: 1 },
		{
			field: "dateOfJoining",
			headerName: "Date of joining",
			flex: 1,
			valueGetter: (params) => fDate(params.row.dateOfJoining),
		},
		{
			field: "yearsOfExperience",
			headerName: "Experience",
			flex: 1,
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			renderCell: (params) => {
				if (
					params.row.isEligibleForPromotion &&
					params.row.role !== "Manager"
				) {
					return (
						<IconButton
							onClick={() => handleViewDetails(params.row.id)}
							color='success'
						>
							<AdminPanelSettingsIcon />
						</IconButton>
					);
				} else {
					if (params.row.isManager || params.row.role === "Manager") {
						return (
							<IconButton onClick={() => handleViewDetailsD(params.row.id)}>
								<AdminPanelSettingsIcon
									color='primary'
									sx={{ color: "blue" }}
								/>
							</IconButton>
						);
					} else {
						return (
							<IconButton disabled sx={{ background: "yellow" }}>
								<AdminPanelSettingsIcon color='error' />
							</IconButton>
						);
					}
				}
			},
		},
	];

	return (
		<>
			<Container>
				<Card>
					{isLoading ? (
						<Skeleton variant='rectangular' width='100%' height={400} />
					) : (
						<DataGrid
							rows={emp}
							columns={columns}
							components={{
								Toolbar: GridToolbar,
							}}
							autoHeight
							density='comfortable'
						/>
					)}
				</Card>
				<Modal
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby='parent-modal-title'
					aria-describedby='parent-modal-description'
				>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							height: "10%",
							width: "29%",
							bgcolor: "background.paper",
							border: "2px solid #000",
							boxShadow: 24,
							pt: 2,
							px: 4,
							pb: 3,
						}}
					>
						<Box>
							{eligibleForPromotion && (
								<Stack spacing={2} direction='row'>
									<Button
										onClick={handlePromoteEmployee}
										variant='contained'
										sx={{ background: "green" }}
									>
										Promote Employee
									</Button>
									<Button
										onClick={handleCloseModal}
										variant='contained'
										sx={{ background: "red" }}
									>
										Cancel
									</Button>
								</Stack>
							)}
							{demoteToEmployee && (
								<Stack spacing={2} direction='row'>
									<Button
										onClick={handleDemoteToEmployee}
										variant='contained'
										sx={{ background: "green" }}
									>
										Demote to Employee
									</Button>
									<Button
										onClick={handleCloseModal}
										variant='contained'
										sx={{ background: "red" }}
									>
										Cancel
									</Button>
								</Stack>
							)}
						</Box>
					</Box>
				</Modal>
			</Container>
		</>
	);
};

export default EmployeeContainer;
