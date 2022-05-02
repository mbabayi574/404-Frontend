import * as React from 'react';
import Grid from "@mui/material/Grid";
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

import {MyAppBar, MyDrawer} from '../../components/layout'

export default function Dashboard() {
  	return (
    	<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<MyAppBar />
			<MyDrawer />
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: '#e9e9ec', p: 3 }}
			>
				<Toolbar />
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
			</Box>
		</Box>
	);
}