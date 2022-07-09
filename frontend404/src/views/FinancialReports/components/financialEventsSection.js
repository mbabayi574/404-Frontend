import NewFinancialEvent from "./newFinancialEvent";
import ViewFinancialEvents from "./viewFinancialEvents";
import UpdateFinancialEvent from "./updateFinancialEvent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";
import { dummyEvents } from "../dummy-data";
import { faker } from "@faker-js/faker";

const FinancialEventsSection = (props) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const api = useAPI();

  useEffect(() => {
    setPage(Math.max(Math.min(page, Math.ceil(count / 10) - 1), 0));
  }, [page, count])
  
  const getEvents = () => {
    var config = {
      method: "get",
      url: "FinReport/main",
      headers: {
        Accept: "application/json",
      },
      params: {
        page: page + 1
      }
    };
    api(config)
      .then((response) => {
        setEvents(
          response.data.results
        );
        setCount(response.data.count);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();

  const addEvent = (values) => {
    const event = {
      ...values,
      date_period: formatDate(values.date_period)
    };
    console.log(event);
    api({
      method: "post",
      url: "FinReport/main/",
      headers: {
        "Content-Type": "application/json",
      },
      data: event,
    }).then(response => {
      getEvents();
    }).catch(error => {
      console.log(error.response.data);
    });
  };

  const updateEvent = (values) => {
    const event = {
      ...values,
      date_period: formatDate(values.date_period)
    };
    api({
      method: "patch",
      url: `FinReport/main/${selectedEventId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: event,
    }).then(response => {
      getEvents();
    }).catch(error => {
      console.log(error.response.data);
    });
  }
  const deleteEvent = () => {
    api({
      method: "delete",
      url: `FinReport/main/${selectedEventId}`,
    }).then(response => {
      getEvents();
    }).catch(error => {
      console.log(error.response.data);
    });
  }

  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  useEffect(() => {
    getEvents();
  }, [page]);

  const selectedEvent = events.find(event => event.id === selectedEventId);

  return (
    <Grid container spacing={3}
      sx={{ height: "100%" }}
    >
      <Grid item xs={4}>
        <Stack spacing={3} sx={{ height: "100%" }}>
          <NewFinancialEvent
            addEvent={addEvent}
          />
          <Box flexGrow="1">
            <UpdateFinancialEvent
              selectedEvent={selectedEvent}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
            />
          </Box>
        </Stack>

      </Grid>
      <Grid item xs={8}>
        <Stack spacing={3} sx={{ height: "100%" }}>
          <Box flexGrow="1">
            <ViewFinancialEvents
              events={events}
              count={count}
              page={page}
              setPage={setPage}
              setSelectedEventId={setSelectedEventId}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FinancialEventsSection;