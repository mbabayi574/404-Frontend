import { Box, Container, Grid, List, Stack } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import EmployeeItem from "./components/employeeItem";
import EmployeeCard from "./components/employeeCard";
import useAPI from "useAPI";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  /* city: "Tabriz",
  country: "Iran",
  jobTitle: "Senior Developer",
  name: "Babak Behkam",
  timezone: "GTM-7",*/
};

// const employees = [
// 	{
// 		first_name: "AmirMahdi",
// 		last_name: "Ikani",
// 		gender: "Male",
// 		role: "Frontend Developer",
// 		marriage: "Single",
// 		education: "Diploma",
// 		email: "m.ikani1380@gmail.com",
// 		birth_date: "1380/3/7",
// 		phone_number: "09123456789",
// 		personal_id: "1",
// 		address: "Iran, Tehran, Iran University of Science and Technology",
// 		postal_code: "2180912710",
// 	},
// 	{
// 		first_name: "Diyar",
// 		last_name: "Hamedi",
// 		gender: "Male",
// 		role: "Frontend Developer",
// 		marriage: "Single",
// 		education: "Diploma",
// 		email: "diyarhamedi81@gmail.com",
// 		birth_date: "1381/5/27",
// 		phone_number: "09304543403",
// 		personal_id: "2",
// 		address: "Iran, West Azarbayjan, Mahabad",
// 		postal_code: "5915888800",
// 	},
// 	{
// 		first_name: "MohammadAmin",
// 		last_name: "GeramiMehr",
// 		gender: "Male",
// 		role: "Backend Developer",
// 		marriage: "Single",
// 		education: "Diploma",
// 		email: "mag1379@gmail.com",
// 		birth_date: "1379/8/15",
// 		phone_number: "09328891234",
// 		personal_id: "3",
// 		address: "Iran, Kashan",
// 		postal_code: "7915888800",
// 	},
// 	{
// 		first_name: "Parsa",
// 		last_name: "Noroozi",
// 		gender: "Male",
// 		role: "Frontend Developer",
// 		marriage: "Single",
// 		education: "Diploma",
// 		email: "parsa.nrz@gmail.com",
// 		birth_date: "1379/8/15",
// 		phone_number: "09328891234",
// 		personal_id: "4",
// 		address: "Iran, Tehran",
// 		postal_code: "7915888800",
// 	},
// 	{
// 		first_name: "Mohammadreza",
// 		last_name: "Babayi",
// 		gender: "Male",
// 		role: "Frontend Developer",
// 		marriage: "Single",
// 		education: "Diploma",
// 		email: "m.babayiii@gmail.com",
// 		birth_date: "1379/8/15",
// 		phone_number: "09328891234",
// 		personal_id: "5",
// 		address: "Iran, Tehran, Iran University of Science and Technology",
// 		postal_code: "2180912710",
// 	},
// 	{
// 		first_name: "Seyed Moein",
// 		last_name: "Kazemi",
// 		gender: "Male",
// 		role: "Backend Developer",
// 		marriage: "Single",
// 		education: "Diploma",
// 		email: "s_moein_kazemi@gmail.com",
// 		birth_date: "1379/8/15",
// 		phone_number: "09328891234",
// 		personal_id: "6",
// 		address: "Iran, Tehran, Iran University of Science and Technology",
// 		postal_code: "2180912710",
// 	},
// ]

const HrDesk = () => {
  const [employees, setEmployees] = useState([]);
	const [selectedEmployee, selectEmployee] = useState(null);
  const api = useAPI();
  useEffect(() => {
    api({
      url: "HRdesk/other-employee"
    })
    .then(response => {
      console.log(response);
      setEmployees(response.data);
    })
  }, [])
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
											selected={selectedEmployee && selectedEmployee.username === employee.username}
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
