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
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  /* city: "Tabriz",
  country: "Iran",
  jobTitle: "Senior Developer",
  name: "Babak Behkam",
  timezone: "GTM-7",*/
};

const employees = [
	{
		first_name: "AmirMahdi",
		last_name: "Ikani",
		gender: "Male",
		role: "Frontend Developer",
		marriage: "Single",
		education: "Diploma",
		email: "m.ikani1380@gmail.com",
		birth_date: "1380/3/7",
		phone_number: "09123456789",
		personal_id: "1",
		address: "Iran, Tehran, Iran University of Science and Technology",
		postal_code: "2180912710",
	},
	{
		first_name: "Diyar",
		last_name: "Hamedi",
		gender: "Male",
		role: "Frontend Developer",
		marriage: "Single",
		education: "Diploma",
		email: "diyarhamedi81@gmail.com",
		birth_date: "1381/5/27",
		phone_number: "09304543403",
		personal_id: "2",
		address: "Iran, West Azarbayjan, Mahabad",
		postal_code: "5915888800",
	},
	{
		first_name: "MohammadAmin",
		last_name: "GeramiMehr",
		gender: "Male",
		role: "Backend Developer",
		marriage: "Single",
		education: "Diploma",
		email: "mag1379@gmail.com",
		birth_date: "1379/8/15",
		phone_number: "09328891234",
		personal_id: "3",
		address: "Iran, Kashan",
		postal_code: "7915888800",
	},
	{
		first_name: "Parsa",
		last_name: "Noroozi",
		gender: "Male",
		role: "Frontend Developer",
		marriage: "Single",
		education: "Diploma",
		email: "parsa.nrz@gmail.com",
		birth_date: "1379/8/15",
		phone_number: "09328891234",
		personal_id: "4",
		address: "Iran, Tehran",
		postal_code: "7915888800",
	},
	{
		first_name: "Mohammadreza",
		last_name: "Babayi",
		gender: "Male",
		role: "Frontend Developer",
		marriage: "Single",
		education: "Diploma",
		email: "m.babayiii@gmail.com",
		birth_date: "1379/8/15",
		phone_number: "09328891234",
		personal_id: "5",
		address: "Iran, Tehran, Iran University of Science and Technology",
		postal_code: "2180912710",
	},
	{
		first_name: "Seyed Moein",
		last_name: "Kazemi",
		gender: "Male",
		role: "Backend Developer",
		marriage: "Single",
		education: "Diploma",
		email: "s_moein_kazemi@gmail.com",
		birth_date: "1379/8/15",
		phone_number: "09328891234",
		personal_id: "6",
		address: "Iran, Tehran, Iran University of Science and Technology",
		postal_code: "2180912710",
	},
]

const EmployeeItem = ({employee, select, selected}) => {
	const handleSelect = () => {
		console.log(employee);
		select(employee);
	}
	return (
		<Box
			onClick={handleSelect}
			sx={{
				backgroundColor: selected ? "action.selected" : "background.paper",
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
				p: 2
			}}
		>
			<Avatar
				src={user.avatar}
				sx={{
					height: 48,
					ml: 1,
					width: 48,
				}}
			/>
			<Typography
				color="textPrimary"
				variant="h6"
				sx={{
					ml: 3,
				}}
			>
				{employee.first_name} {employee.last_name}
			</Typography>
		</Box>
	);
}

const EmployeeCard = ({employee}) => {
	const InfoField = ({label, value}) => (
		<Grid item md={6} xs={12}>
			<Stack sx={{px: 8, alignItems: "center"}} direction="row" spacing={1}>
				<Typography variant="h6" sx={{alignSelf: "flex-start"}} >{label}:</Typography>
				<Typography variant="body1" >{value}</Typography>
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
				<InfoField label="Role" value={employee.role} />
				<InfoField label="Marriage Status" value={employee.marriage} />
				<InfoField label="Degree of Education" value={employee.education} />
				<InfoField label="Email Address" value={employee.email} />
				<InfoField label="Date of Birth" value={employee.birth_date} />
				<InfoField label="Phone Number" value={employee.phone_number} />
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

const HrDesk = () => {
	const [selectedEmployee, selectEmployee] = useState(null);
	return (
		<Box
				component="main"
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Container
					maxWidth={false}
					sx={{
						p: 3,
						height: "100%",
					}}
				>
					<Card>
						<Grid container>
							<Grid item lg={4} md={6} xs={6}>
								<Stack divider={<Divider />}>
									{
										employees.map((employee) => (
										<EmployeeItem
											employee={employee}
											select={selectEmployee}
											selected={selectedEmployee && selectedEmployee.personal_id === employee.personal_id}
										/>))
									}
								</Stack>
							</Grid>
							<Grid item lg={8} md={6} xs={12}>
								<Card sx={{
										height: "100%",
										width: "100%",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
								}}>
									<Avatar
										// src={user.avatar}
										sx={{
											height: 128,
											mt: 2,
											mb: 2,
											width: 128,
										}}
									/>
									<Divider />
									<EmployeeCard employee={selectedEmployee}/>
									<Divider />
								</Card>
							</Grid>
						</Grid>
					</Card>
				</Container>
		</Box>
	)
};
export default HrDesk;
