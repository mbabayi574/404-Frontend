import * as React from 'react';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NotificationList from '../../components/dashboard/notificationList';
import TodoList from '../../components/dashboard/todoList';
import ProfileCard from "../../components/dashboard/profileCard";
import TimeTrackerCard from "../../components/dashboard/timeTrackerCard";
import TimeTrackerReportCard from "../../components/dashboard/timeTrackerReportCard";
import FinancialReportCard from "../../components/dashboard/financialReportCard";
import ServiceCounterCard from "../../components/dashboard/serviceCounterCard";
import SalaryCard from "../../components/dashboard/salaryCard";
import NutritionCard from "../../components/dashboard/nutritionCard";
import Box from '@mui/material/Box';

const Dashboard = () => {
  	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8
			}}
		>
			<Container>
				<Grid container spacing={3}>
					<Grid item container direction="column" xs={4} spacing={3}>
						<Grid item>
							<ProfileCard/>
						</Grid>
						<Grid item>
							<TimeTrackerCard />
						</Grid>
						<Grid item>
							<NutritionCard />
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<NotificationList />
					</Grid>
					<Grid item xs={4}>
						<TodoList />
					</Grid>
					<Grid item container direction="column" xs={6} spacing={3}>
						<Grid item>
							<TimeTrackerReportCard />
						</Grid>
						<Grid item>
							<ServiceCounterCard />
						</Grid>
					</Grid>
					<Grid item container direction="column" xs={6} spacing={3}>
						<Grid item>
							<FinancialReportCard />
						</Grid>
						<Grid item>
							<SalaryCard />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Dashboard;