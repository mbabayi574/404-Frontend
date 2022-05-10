import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function createData(type, count, salary, total) {
    return {
        type: type,
        count: count,
        salary: (salary ? salary.toLocaleString() : ''),
        total: total.toLocaleString()
    };
}

const rows = [
  createData('Lv. 1 Employee', 30, 6_000_000, 180_000_000),
  createData('Lv. 2 Employee', 10, 10_000_000, 100_000_000),
  createData('Lv. 3 Employee', 3, 20_000_000, 60_000_000),
  createData('CEO', 1, 30_000_000, 30_000_000),
  createData('Total', 44, null, 370_000_000),
];

const SalaryCard = () => {
    return (
        <Paper sx={{
            padding: 2
        }}>
            <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            }}>
                <Box>
                    <Typography variant="h5" component="h1" fontWeight="bolder">
                        Salaries
                    </Typography>
                    <Box marginLeft="auto">
                        <Button>
                            View all
                        </Button>
                    </Box>
                </Box>
                <Table sx={{ minWidth: 400, marginLeft: 2 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Count</TableCell>
                    <TableCell align="right">Avg. Salary</TableCell>
                    <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.type}
                        </TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                        <TableCell align="right">{row.salary}</TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};

export default SalaryCard;