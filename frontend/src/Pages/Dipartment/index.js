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
	

	const fetchData = async () => {
		try {
			const res = await API.get("/department/v1/");

			const em = res.data.data
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


	

	

	const columns = [
		{
			field: "id",
			headerName: "ID",
			flex: 1,
		},
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "location", headerName: "Location", flex: 1 },
		{ field: "manager", headerName: "Manager", flex: 1 },
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
				
			</Container>
		</>
	);
};

export default EmployeeContainer;
