import * as React from 'react';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NotificationList from './notificationList';
import TodoList from './todoList';
import ProfileCard from "./profileCard";
import TimeTrackerCard from "./timeTrackerCard";
import TimeTrackerReportCard from "./timeTrackerReportCard";
import FinancialReportCard from "./financialReportCard";
import ServiceCounterCard from "./serviceCounterCard";
import SalaryCard from "./salaryCard";
import NutritionCard from "./nutritionCard";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import { DashboardLayout } from '../../components/dashboard-layout';

const DashboardView = () => {
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

const Dashboard = () => (
	<DashboardLayout>
		<DashboardView />
	</DashboardLayout>
);

export default Dashboard;