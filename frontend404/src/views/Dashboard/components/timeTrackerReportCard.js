import React, { PureComponent } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Sat', workhours: 200 },
  { day: 'Sun', workhours: 210 },
  { day: 'Mon', workhours: 230 },
  { day: 'Tue', workhours: 215 },
  { day: 'Wed', workhours: 180 },
  { day: 'Thu', workhours: 40 },
  { day: 'Fri', workhours: 30 },
];

const missingCount = 6;

const TimeTrackerReportCard = () => {
    const [data, setData] = React.useState(chartData);
    const getWeeklyTotal = () => {
      return data.reduce((prevSum, next) => prevSum + next.workhours, 0);
    }
    return (
      <Card sx={{
        padding: 2
      }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h5" component="h1" fontWeight="bolder">
            Time Tracking Report
          </Typography>
          <Box marginLeft="auto">
            <Button>
                View Details
            </Button>
          </Box>
        </Box>
        <Box marginTop={2} display="flex" flexDirection="row">
          <BarChart width={320} height={200} data={data}>
            <XAxis dataKey="day" tick={{fontSize: 14}}/>
            <YAxis tick={{fontSize: 14}}/>
            <Bar dataKey="workhours" fill="#8884d8" />
          </BarChart>
          <Box marginLeft={2}>
            <Typography variant="h5" component="h2">
              <Box fontWeight="bolder">
                {getWeeklyTotal()} work hours
              </Box> in the past week
            </Typography>
            <Typography variant="h5" component="h2" sx={{marginTop: 2}}>
              <Box fontWeight="bolder" display="inline">
                {missingCount} employees
              </Box> worked less hours than usual
            </Typography>
          </Box>
        </Box>
      </Card>
    );
};

export default TimeTrackerReportCard;