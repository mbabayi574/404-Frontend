import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Search from "@mui/icons-material/Search";
import { useState, useContext } from "react";
import mapPlaceholder from "images/map-placeholder.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "App";

const TransportationAddService = () => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [address, setAddress] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [arrivalTime, setArrivalTime] = useState({ hour: 0, minute: 0 });
  const [returnTime, setReturnTime] = useState({ hour: 0, minute: 0 });
  const [workingDays, setWorkingDays] = useState({
    Sat: false,
    Sun: false,
    Mon: false,
    Teu: false,
    Wed: false,
    Thu: false,
    Fri: false,
  });
  const [details, setDetails] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };
  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const handleArrivalHourChange = (e) => {
    setArrivalTime({ ...arrivalTime, hour: e.target.value });
  };
  const handleArrivalMinuteChange = (e) => {
    setArrivalTime({ ...arrivalTime, minute: e.target.value });
  };
  const handleReturnHourChange = (e) => {
    setReturnTime({ ...returnTime, hour: e.target.value });
  };
  const handleReturnMinuteChange = (e) => {
    setReturnTime({ ...returnTime, minute: e.target.value });
  };

  const handleWorkingDaysChange = (e) => {
    let newWorkingDays = { ...workingDays };
    newWorkingDays[e.target.value] = e.target.checked;
    setWorkingDays(newWorkingDays);
  };

  const clearWorkingDays = (e) => {
    setWorkingDays({
      Sat: false,
      Sun: false,
      Mon: false,
      Teu: false,
      Wed: false,
      Thu: false,
      Fri: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatTime = (time) => {
      return (
        time.hour.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        ":" +
        time.minute.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      );
    };

    let newError = {};
    if (address === null || address === "")
      newError.address = ["This field may not be null."];
    if (parseInt(capacity) <= 0)
      newError.maximum_capacity = ["Capacity must be a positive number."];

    console.log(newError);
    if (Object.keys(newError).length !== 0) {
      setError(newError);
      return;
    }

    var serviceData = JSON.stringify({
      address: address,
      maximum_capacity: capacity,
      details: details,
      address_search: null,
      location: null,
      arrival_time: formatTime(arrivalTime),
      Return_time: formatTime(returnTime),
      saturday: workingDays["Sat"],
      sunday: workingDays["Sun"],
      monday: workingDays["Mon"],
      tuesday: workingDays["Tue"],
      wednesday: workingDays["Wed"],
      thursday: workingDays["Thu"],
      friday: workingDays["Fri"],
    });

    var config = {
      method: "post",
      // url: "http://404g.pythonanywhere.com/ServiceCounter/admintransportations/",
      url: "http://127.0.0.1:8000/ServiceCounter/transportation/admintransportations/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: serviceData,
    };

    axios(config)
      .then((response) => {
        if (response.status == 200) {
          navigate("/transportation");
        }
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
          height: "100%",
        }}
      >
        <Stack spacing={3} sx={{ height: "100%", width: "100%" }}>
          <Box>
            <Typography variant="h4">Add New Service</Typography>
          </Box>

          <Stack
            spacing={4}
            direction="row"
            sx={{
              flexGrow: 1,
              height: "100%",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <Typography variant="h5" sx={{ p: 2 }}>
                Service Info
              </Typography>
              <Divider />
              <Stack spacing={2} sx={{ p: 3 }}>
                <Stack spacing={2} direction="row">
                  <TextField
                    required
                    label="Address"
                    onChange={handleAddressChange}
                    sx={{ flexGrow: 1, maxWidth: "auto" }}
                    error={error.hasOwnProperty("address")}
                    helperText={
                      error.hasOwnProperty("address") ? error.address[0] : " "
                    }
                  />
                  <Button variant="outlined" startIcon={<Search />}>
                    Find Location
                  </Button>
                </Stack>
                <TextField
                  type="number"
                  error={error.hasOwnProperty("maximum_capacity")}
                  helperText={
                    error.hasOwnProperty("maximum_capacity")
                      ? error.maximum_capacity[0]
                      : " "
                  }
                  value={capacity}
                  onChange={handleCapacityChange}
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  label="Capacity"
                />
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ alignItems: "center" }}
                >
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Arrival Time
                  </Typography>
                  <TextField
                    label="Hour"
                    select
                    sx={{ flexGrow: 1 }}
                    value={arrivalTime.hour}
                    onChange={handleArrivalHourChange}
                    SelectProps={{
                      MenuProps: { PaperProps: { sx: { maxHeight: 200 } } },
                    }}
                  >
                    {[...Array(24).keys()].map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Minute"
                    select
                    sx={{ flexGrow: 1 }}
                    value={arrivalTime.minute}
                    onChange={handleArrivalMinuteChange}
                    SelectProps={{
                      MenuProps: { PaperProps: { sx: { maxHeight: 200 } } },
                    }}
                  >
                    {[...Array(60).keys()].map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ alignItems: "center" }}
                >
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Return Time
                  </Typography>
                  <TextField
                    label="Hour"
                    select
                    sx={{ flexGrow: 1 }}
                    value={returnTime.hour}
                    onChange={handleReturnHourChange}
                    SelectProps={{
                      MenuProps: { PaperProps: { sx: { maxHeight: 200 } } },
                    }}
                  >
                    {[...Array(24).keys()].map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Minute"
                    select
                    sx={{ flexGrow: 1 }}
                    value={returnTime.minute}
                    onChange={handleReturnMinuteChange}
                    SelectProps={{
                      MenuProps: { PaperProps: { sx: { maxHeight: 200 } } },
                    }}
                  >
                    {[...Array(60).keys()].map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, maxWidth: "fit-content" }}
                  >
                    Working Days
                  </Typography>
                  {["Sat", "Sun", "Mon", "Teu", "Wed", "Thu", "Fri"].map(
                    (day) => (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={day}
                        value={day}
                        checked={workingDays[day]}
                        onChange={handleWorkingDaysChange}
                      />
                    )
                  )}
                  <Button onClick={clearWorkingDays} variant="text">
                    Clear All
                  </Button>
                </Stack>
                <TextField
                  label="Details"
                  onChange={handleDetailsChange}
                  fullWidth
                  multiline
                  rows={6}
                  error={error.hasOwnProperty("details")}
                  helperText={
                    error.hasOwnProperty("details") ? error.details[0] : " "
                  }
                />
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ justifyContent: "flex-end" }}
                >
                  <Button href="/my/transportation" variant="outlined">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} variant="contained">
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Container>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "auto",
          height: "880px",
        }}
      >
        <img
          style={{
            width: "700px",
            height: "100%",
            objectFit: "none",
          }}
          src={mapPlaceholder}
        />
      </Box>
    </Box>
  );
};
export default TransportationAddService;