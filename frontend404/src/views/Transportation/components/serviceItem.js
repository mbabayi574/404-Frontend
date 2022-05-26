import Button from "@mui/material/Button";
import Collapse from '@mui/material/Collapse';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useAPI from "useAPI";

export const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const ServiceItem = ({ service, username, role, loadServices }) => {
	const api = useAPI();
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
			url: `ServiceCounter/transportation/employee/showlists/reserve/${service.id}`,
			headers: {
				Accept: "application/json",
			},
		};
		api(config)
			.then((response) => {
				console.log(response.data);
				loadServices();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	const handleUnsubscribe = () => {
		var config = {
			method: "patch",
			url: `ServiceCounter/transportation/employee/showlists/unreserve/${service.id}`,
			headers: {
				Accept: "application/json",
			},
		};
		api(config)
			.then((response) => {
				console.log(response.data);
				loadServices();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	const handleDelete = () => {
		var config = {
			method: "delete",
			url: `ServiceCounter/transportation/admintransportations/service/${service.id}`,
			headers: {
				Accept: "application/json",
			},
		};
		api(config)
			.then((response) => {
				setOpenDialog(false);
				console.log(response.data);
				loadServices();
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

export default ServiceItem;