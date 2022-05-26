import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import ServiceItem, { daysOfWeek } from './components/serviceItem';
import useAPI from "useAPI";

const Transportation = () => {
	const [services, setServices] = useState([]);
	const [username, setUsername] = useState([]);
	const [role, setRole] = useState("");
	const api = useAPI();
	const navigate = useNavigate();

	const loadServices = () => {
		var config = {
			method: "get",
			url: "auth/users/me",
			headers: {
				Accept: "application/json",
			},
		};
		api(config)
			.then((response) => {
				if (response.status == 200) {
					setUsername(response.data.username);
					setRole(response.data.role);
				}
			})
			.catch((error) => {
				console.log(error);
				return;
			});
		var config = {
			method: "get",
			url: "ServiceCounter/transportation/employee/showlists",
			headers: {
				Accept: "application/json",
			},
		};
		api(config)
			.then((response) => {
				if (response.status == 200) {
					setServices(
						response.data
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		loadServices();
	}, []);

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
					height: "93vh",
				}}
			>
				<Stack
					spacing={3}
					sx={{
						flexGrow: 1,
						maxWidth: "auto",
						height: "100%",
						alignItems: "center",
					}}
				>
					<Card sx={{ p: 1, width: "100%", height: "100%" }}>
						<TableContainer sx={{ width: "100%", maxHeight: "780px" }}>
							<Table stickyHeader aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>
											{
												role === "C" && (
													<Button
														size="small"
														variant="contained"
														startIcon={<AddIcon />}
														onClick={() => navigate("/my/transportation/add")}
													>
														Add Service
													</Button>
												)
											}
										</TableCell>
										<TableCell>Address</TableCell>
										<TableCell align="center">Arrival Time</TableCell>
										<TableCell align="center">Return Time</TableCell>
										<TableCell align="center" colSpan={7}>Days</TableCell>
										<TableCell align="right">Capacity</TableCell>
										<TableCell />
									</TableRow>
									<TableRow>
										<TableCell />
										<TableCell />
										<TableCell />
										<TableCell />
										{daysOfWeek.map((day) => (
											<TableCell size="small" align="center">{day}</TableCell>
										))}
										<TableCell />
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{services.map((service) => (
										<ServiceItem
											service={service}
											role={role}
											username={username}
											loadServices={loadServices}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Card>
				</Stack>
			</Container>
		</Box>
	);
};
export default Transportation;