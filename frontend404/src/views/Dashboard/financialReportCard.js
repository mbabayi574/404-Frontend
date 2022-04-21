import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <React.Fragment>
            <text x={x} y={y - 8} fill="white" textAnchor="middle" dominantBaseline="central">
                <tspan>{name}</tspan>
            </text>
            <text x={x} y={y + 8} fill="white" textAnchor="middle" dominantBaseline="central">
                <tspan>{`${(percent * 100).toFixed(0)}%`}</tspan>
            </text>
        </React.Fragment>
    );
};

const earnings = 800_000_000;

const expenses = [
  { type: 'Payment', amount: 350_000_000 },
  { type: 'Nutrition', amount: 150_000_000 },
  { type: 'Bills', amount: 180_000_000 },
  { type: 'Taxes', amount: earnings / 10 },
];

const FinancialReportCard = () => {
    const getTotalExpenses = () => {
      return expenses.reduce((prevSum, next) => prevSum + next.amount, 0);
    }
    return (
      <Paper sx={{
        padding: 2
      }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h5" component="h1">
            <Box fontWeight="bolder">
              Financial Report
            </Box>
          </Typography>
          <Box marginLeft="auto">
            <Button>
                View Details
            </Button>
          </Box>
        </Box>
        <Box marginTop={2} display="flex" flexDirection="row">
            <PieChart width={240} height={240}>
                <Pie
                    data={expenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={115}
                    fill="#8884d8"
                    nameKey="type"
                    dataKey="amount"
                >
                    {expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => (value.toLocaleString() + " Tomans")} />
            </PieChart>
            <Box marginLeft="auto" marginBottom={2} display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="h6" component="h2">
                    {earnings.toLocaleString()} Tomans earned
                </Typography>
                <Typography variant="h6" component="h2">
                    {getTotalExpenses().toLocaleString()} Tomans spent
                </Typography>
                <Typography variant="h6" component="h2" marginTop={2}>
                    Profit: {(earnings - getTotalExpenses()).toLocaleString()} Tomans
                </Typography>
            </Box>
        </Box>
      </Paper>
    );
};

export default FinancialReportCard;