import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RunBox from "../../components/runBox";
import colors from "../../Theme/colors";
import API from "../../utils/api";

export default function Rn() {
	const theme = useTheme();
	const color = colors(theme.palette.mode);
  const [data, setData] = useState({
    departments: 0,
    employee: 0,
    employees: 0,
    managers: 0,
  });
  
  async function fetch() {
    const res = await API.get("/admin/v1/dashboard");
    setData(res.data.data);
  }
    useEffect(() => {
      fetch();
    }, []);
	return (
		<>
			<br />
			<Box  m="80px">
				<Box
					display='grid'
					gridTemplateColumns='repeat(12, 1fr)'
					gridAutoRows='140px'
					gap='20px'
				>
					<Box
						gridColumn='span 3'
						backgroundColor={color.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<RunBox
							title={data.employee}
							subtitle='Employees'
							icon={
								<BadgeIcon
									sx={{ color: color.greenAccent[600], fontSize: "26px" }}
								/>
							}
						/>
					</Box>
					<Box
						gridColumn='span 3'
						backgroundColor={color.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<RunBox
							title={data.managers}
							subtitle='Managers'
							icon={
								<ManageAccountsIcon
									sx={{ color: color.greenAccent[600], fontSize: "26px" }}
								/>
							}
						/>
					</Box>
          <Box
						gridColumn='span 3'
						backgroundColor={color.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<RunBox
							title={data.employees}
							subtitle='Total'
							icon={
								<PeopleIcon
									sx={{ color: color.greenAccent[600], fontSize: "26px" }}
								/>
							}
						/>
					</Box>
					<Box
						gridColumn='span 3'
						backgroundColor={color.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<RunBox
							title={data.departments}
							subtitle='Departments'
							icon={
								<AccountBalanceIcon
									sx={{ color: color.greenAccent[600], fontSize: "26px" }}
								/>
							}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
}
