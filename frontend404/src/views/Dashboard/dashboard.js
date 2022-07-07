import * as React from 'react';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DashboardTodosCard from './components/todosCard';
import DashboardProfileCard from "./components/profileCard";
import DashboardTimeTrackerCard from "./components/timeTrackerCard";
import FinancialReportCard from "./components/financialReportCard";
import DashboardServiceCounterCard from "./components/serviceCounterCard";
import SalaryCard from "./components/salaryCard";
import DashboardFoodCard from "./components/foodCard";
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
              <DashboardProfileCard />
            </Grid>
            <Grid item>
              <DashboardTodosCard />
            </Grid>
            <Grid item>
              <DashboardFoodCard />
            </Grid>
            <Grid item>
              <DashboardServiceCounterCard />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={8} spacing={3}>
            <Grid item>
              <DashboardTimeTrackerCard />
            </Grid>
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