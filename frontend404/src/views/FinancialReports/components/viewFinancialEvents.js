import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const ViewFinancialEvents = (props) => {
  const { events, setSelectedEventId } = props;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const EventRowEditButton = (props) => {
    const { event } = props;
    return (
      <Tooltip title="edit">
        <IconButton
          onClick={() => setSelectedEventId(event.id)}
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  const EventTableRow = (props) => {
    const { event } = props;
    return (
      <TableRow>
        <TableCell>
          <EventRowEditButton event={event} />
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {event.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="caption">
            {capitalizeFirstLetter(event.type)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="caption">
            {event.amount}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="caption">
            {capitalizeFirstLetter(event.period)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="caption">
            {event.date.toDateString()}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  const EventTable = (props) => {
    const { events } = props;
    return (
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
              <TableCell />
              <TableCell >Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Period</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => (
              <EventTableRow
                event={event}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      p: 1
    }}>
      <EventTable events={events} />
    </Card>
  );
};

export default ViewFinancialEvents;