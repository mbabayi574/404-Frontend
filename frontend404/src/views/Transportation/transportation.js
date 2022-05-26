import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import { TokenContext } from "App";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const Transportation = () => {
	const [services, setServices] = useState([]);
	const [username, setUsername] = useState([]);
	const [role, setRole] = useState("");
	const { token } = useContext(TokenContext);
	const navigate = useNavigate();

	const loadServices = () => {
		var config = {
			method: "get",
			url: "http://127.0.0.1:8000/auth/users/me",
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		};
		axios(config)
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
			url: "http://127.0.0.1:8000/ServiceCounter/transportation/employee/showlists",
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		};
		axios(config)
			.then((response) => {
				// console.log(response.data);
				if (response.status == 200) {
					setServices(
						response.data
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		// setServices(servicesPlaceholder);
	}

	useEffect(() => {
		loadServices();
	}, []);

	const ServiceItem = ({ service }) => {
		const [open, setOpen] = useState(false);
		const [openDialog, setOpenDialog] = useState(false);
		const labelId = `table-checkbox-${service.id}`;
		const subscribed = service.user.find(user => user.username === username) !== undefined;
		const days = {
			'Sat': service.saturday,
			'Sun': service.sunday,
			'Mon': service.monday,
			'Tue': service.tuesday,
			'Wed': service.wednesday,
			'Thu': service.thursday,
			'Fri': service.friday,
		}
		const handleSubscribe = () => {
			var config = {
				method: "patch",
				url: `http://127.0.0.1:8000/ServiceCounter/transportation/employee/showlists/reserve/${service.id}`,
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
			};
			axios(config)
				.then((response) => {
					console.log(response.data);
					if (response.status == 200) {
						loadServices();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		const handleUnsubscribe = () => {
			var config = {
				method: "patch",
				url: `http://127.0.0.1:8000/ServiceCounter/transportation/employee/showlists/unreserve/${service.id}`,
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
			};
			axios(config)
				.then((response) => {
					console.log(response.data);
					if (response.status == 200) {
						loadServices();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		const handleDelete = () => {
			var config = {
				method: "delete",
				url: `http://127.0.0.1:8000/ServiceCounter/transportation/admintransportations/service/${service.id}`,
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
			};
			axios(config)
				.then((response) => {
					setOpenDialog(false);
					console.log(response.data);
					if (response.status == 200) {
						loadServices();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		const handleToggleExpand = () => {
			setOpen(!open);
		}
		return (
			<>
				<TableRow
					hover
					tabIndex={-1}
					key={service.id}
				>
					<TableCell>
						{
							role === "C" && (
								<IconButton onClick={() => setOpenDialog(true)}>
									<DeleteIcon />
								</IconButton>
							)
						}
						<IconButton onClick={handleToggleExpand}>
							{
								open ? <ExpandLessIcon /> : <ExpandMoreIcon />
							}
						</IconButton>
					</TableCell>
					<TableCell
						component="th"
						id={labelId}
						scope="row"
						padding="none"
					>
						{service.address}
					</TableCell>
					<TableCell align="center">
						{service.arrival_time.slice(0, -3)}
					</TableCell>
					<TableCell align="center">
						{service.Return_time.slice(0, -3)}
					</TableCell>
					{daysOfWeek.map((day) => (
						<TableCell align="center">
							<CircleIcon color={days[day] ? 'primary' : 'disabled'} />
						</TableCell>
					))}
					<TableCell align="right">{service.maximum_capacity} Seats</TableCell>
					<TableCell align="center">
						<Button sx={{ alignSelf: "center", width: "100px" }} size="small"
							variant={subscribed ? "outlined" : "contained"}
							// onChange={handleToggleSubscription}
							disabled={!subscribed && service.maximum_capacity === 0}
							onClick={subscribed ? handleUnsubscribe : handleSubscribe}
						>
							{subscribed ? "Subscribed" : "Subscribe"}
						</Button>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
						<Collapse in={open}>
							<Typography variant="body2">
								{service.details}
							</Typography>
						</Collapse>
					</TableCell>
				</TableRow>
				<Dialog
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Selete this service? It will be lost forever.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button autoFocus
							onClick={() => setOpenDialog(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleDelete}>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</>
		)
	}

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
				<Stack spacing={3} sx={{ height: "100%", width: "100%" }}>
					<Box>
						<Typography variant="h4">Transport Services</Typography>
					</Box>
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
											<ServiceItem service={service} />
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Card>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};
export default Transportation;