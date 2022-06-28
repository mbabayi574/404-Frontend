import NewFinancialEvent from "./components/newFinancialEvent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";
import ViewFinancialEvents from "./components/viewFinancialEvents";
import ViewFinancialReports from "./components/viewFinancialReports";
import UpdateFinancialEvent from "./components/updateFinancialEvent";
import { dummyEvents } from "./dummy-data";

const FinancialReports = () => {
  const [editMode, setEditMode] = useState([]);
  const [events, setEvents] = useState(dummyEvents);
  const navigate = useNavigate();
  const api = useAPI();

  const addEvent = (values) => {
    setEvents([...events, values]);
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
          height: "93vh",
        }}
      >
        <Grid container spacing={3}
          sx={{ height: "100%" }}>
          <Grid item xs={4}>
            <Stack spacing={3} sx={{ height: "100%" }}>
              <Box flexGrow="1">
                <NewFinancialEvent
                  addEvent={addEvent}
                />
              </Box>
              <Box flexGrow="1">
                <UpdateFinancialEvent />
              </Box>
            </Stack>
            
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={3} sx={{ height: "100%" }}>
              <Box flexGrow="1">
                <ViewFinancialReports />
              </Box>
              <Box flexGrow="1">
                <ViewFinancialEvents
                  events={events}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FinancialReports;