import { Box, Container, Grid, List, Stack } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";

const EmployeeCard = ({employee}) => {
	const InfoField = ({label, value}) => (
		<Grid item md={6} xs={12}>
			<Stack sx={{px: 8, alignItems: "center"}} direction="row" spacing={1}>
				<Typography variant="h6" sx={{alignSelf: "flex-start"}} >{label}:</Typography>
				<Typography variant="body1" >{value || "Not specified"}</Typography>
			</Stack>
		</Grid>
	);
	if (employee === null) {
		return <Box sx={{
			width: "100%",
			flexGrow: 1,
			maxHeight: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
			<Typography variant="h4">Select an employee</Typography>
		</Box>
	}
	return (
		<CardContent>
			<Grid container spacing={3}>
				<InfoField label="First Name" value={employee.first_name} />
				<InfoField label="Last Name" value={employee.last_name} />
				<InfoField label="Gender" value={employee.gender} />
				<InfoField label="Role" value={employee.role === "C" ? "Manager" : "Employee"} />
				<InfoField label="Marriage Status" value={employee.marriage} />
				<InfoField label="Degree of Education" value={employee.education} />
				<InfoField label="Email Address" value={employee.email} />
				<InfoField label="Date of Birth" value={employee.birth_date} />
				<InfoField label="Phone Number" value={employee.username} />
				<InfoField label="Personal ID" value={employee.personal_id} />
				<InfoField label="Address" value={employee.address} />
				<InfoField label="Postal Code" value={employee.postal_code} />
				{/* <Grid item md={6} xs={12}>
					<div>
						<span>
							<small>User Name: </small>
							<strong> 1234567</strong>
						</span>
					</div>
				</Grid>
				<Grid item md={6} xs={12}>
					<div>
						<span>
							<small>Father Name: </small>
							<strong> basom</strong>
						</span>
					</div>
				</Grid>
				<Grid item md={6} xs={12}>
					<div>
						<span>
							<small>Mother Name: </small>
							<strong> zahra</strong>
						</span>
					</div>
				</Grid> */
				/* <Grid item md={6} xs={12}>
					<div>
						<span>
							<small>Company: </small>
							<strong> kale</strong>
						</span>
					</div>
				</Grid> */}
			</Grid>
		</CardContent>
	);
}

export default EmployeeCard;