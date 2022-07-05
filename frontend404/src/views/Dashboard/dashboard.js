import * as React from 'react';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NotificationList from './components/notificationList';
import DashboardTodosCard from './components/todosCard';
import DashboardProfileCard from "./components/profileCard";
import TimeTrackerCard from "./components/timeTrackerCard";
import TimeTrackerReportCard from "./components/timeTrackerReportCard";
import FinancialReportCard from "./components/financialReportCard";
import ServiceCounterCard from "./components/serviceCounterCard";
import SalaryCard from "./components/salaryCard";
import NutritionCard from "./components/nutritionCard";
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
							<DashboardProfileCard/>
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
						<DashboardTodosCard />
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