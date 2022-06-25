import Card from "@mui/material/Card";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import { useState } from "react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const onetimeEvents = [
  {
    id: 1,
    name: "Install Backup Servers",
    date: new Date(),
    type: "expense",
    amount: "-600000000",
  },
  {
    id: 2,
    name: "Merchandise Rights",
    date: new Date(),
    type: "income",
    amount: "+2100000000",
  },
];
const periodicEvents = [
  {
    id: 1,
    name: "Transportation",
    period: "monthly",
    type: "expense",
    amount: "-30000000",
  },
  {
    id: 2,
    name: "Sponsership",
    period: "yearly",
    type: "income",
    amount: "+1700000000",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ViewFinancialEvents = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const OnetimeEventTableRow = (props) => {
    const { event } = props;
    return (
      <TableRow>
        <TableCell>
          <Typography variant="body2">
            {event.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">
            {event.amount}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">
            {event.date.toDateString()}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  const onetimeEventTableContent = (
    <TableContainer
      sx={{
        width: "100%",
        maxHeight: "100%"
      }}
    >
      <Table
        stickyHeader
        aria-label="periodic-events-table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onetimeEvents.map(event => (
            <OnetimeEventTableRow
              event={event}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const PeriodicEventTableRow = (props) => {
    const { event } = props;
    return (
      <TableRow>
        <TableCell>
          <Typography variant="body2">
            {event.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">
            {event.amount}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">
            {capitalizeFirstLetter(event.period)}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  const periodicEventTableContent = (
    <TableContainer
      sx={{
        width: "100%",
        maxHeight: "100%"
      }}
    >
      <Table
        stickyHeader
        aria-label="periodic-events-table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Period</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {periodicEvents.map(event => (
            <PeriodicEventTableRow
              event={event}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      p: 1
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="events-table-tabs"
        >
          <Tab label="One-Time Events" {...a11yProps(0)} />
          <Tab label="Periodic Events" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {onetimeEventTableContent}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {periodicEventTableContent}
      </TabPanel>
    </Card>
  );
};

export default ViewFinancialEvents;