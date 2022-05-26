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

export default EmployeeItem;