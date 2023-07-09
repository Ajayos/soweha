import React, { useState, useEffect } from "react";
import { IconButton, Card, Modal, Box, Skeleton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";

import useHelmet from "../../hooks/useHelmet";
import API from "../../utils/api";
import AddEmployeeForm from "./Form";

const EmployeeContainer = () => {
	const { setTitle } = useHelmet();
	const [emp, setEmp] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectId, setSelectId] = useState(null);

	function fDate(date, newFormat) {
		const fm = newFormat || "dd MMM yyyy";

		return date ? format(new Date(date), fm) : "";
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await API.get("/employee/v1/");
				const currentYear = new Date().getFullYear();
				const em = res.data.data.map((emp) => {
					const yearOfJoining = new Date(emp.dateOfJoining).getFullYear();
					const yearsOfExperience = emp.yearsOfExperience;
					const experience = yearOfJoining - currentYear + yearsOfExperience;

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
					};
				});
				setEmp(em);
				setIsLoading(false);
			} catch (error) {
				console.log("Error: ", error);
			}
		};

		fetchData();
	}, []);

	const handleViewDetails = (id) => {
		setSelectId(id);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectId(null);
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
			field: "edit",
			headerName: "Edit",
			flex: 1,
			renderCell: (params) => (
				<IconButton
					onClick={() => handleViewDetails(params.row.id)}
					color='primary'
				>
					<EditIcon />
				</IconButton>
			),
		},
	];
	setTitle("Employee Details");
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
							height: "90%",
							width: "90%",
						}}
					>
						<AddEmployeeForm id={selectId} />
					</Box>
				</Modal>
			</Container>
		</>
	);
};

export default EmployeeContainer;
