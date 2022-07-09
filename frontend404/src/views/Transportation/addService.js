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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";
import useForm from "useForm";

const TransportationAddService = () => {
  const daysOfWeek = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];

  const callback = () => {
    var serviceData = JSON.stringify({
      address: values.address,
      maximum_capacity: values.maximum_capacity,
      details: values.details,
      address_search: null,
      location: null,
      arrival_time: formatTime(values.arrival_hour, values.arrival_minute),
      Return_time: formatTime(values.return_hour, values.return_minute),
      saturday: values.saturday,
      sunday: values.sunday,
      monday: values.monday,
      tuesday: values.tuesday,
      wednesday: values.wednesday,
      thursday: values.thursday,
      friday: values.friday,
    });

    var config = {
      method: "post",
      url: "Transportation/admin/",
      headers: {
        "Content-Type": "application/json",
      },
      data: serviceData,
    };

    api(config)
      .then((response) => {
        if (response.status == 200) {
          navigate("/my/transportation");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const validate = (values) => {
    let errors = {}
    if (!values.address) {
      errors.address = "Please enter the address";
    }
    if (!values.maximum_capacity) {
      errors.maximum_capacity = "Please enter capacity";
    } else if (parseInt(values.maximum_capacity) <= 0) {
      errors.maximum_capacity = "Capacity must be a positive number";
    }
    if (!values.arrival_hour) {
      errors.arrival_hour = "Please select the arrival hour";
    }
    if (!values.arrival_minute) {
      errors.arrival_minute = "Please select the arrival minute";
    }
    if (!values.return_hour) {
      errors.return_hour = "Please select the return hour";
    }
    if (!values.return_minute) {
      errors.return_minute = "Please select the return minute";
    }
    if (!values.details) {
      errors.details = "Please enter the details";
    }
    return errors;
  };
  const initialData = {
    address: "",
    maximum_capacity: "",
    details: "",
    arrival_hour: "",
    arrival_minute: "",
    return_hour: "",
    return_minute: "",
    saturday: false,
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  };

  const formatTime = (hour, minute) => {
    return (
      hour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      minute.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
  };


  const api = useAPI();
  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
  } = useForm(callback, validate, initialData);

  const handleWorkingDaysChange = (event, day) => {
    handleChange({ target: { name: day, value: event.target.checked } });
  };

  const clearWorkingDays = (event) => {
    daysOfWeek.forEach(day => {
      handleChange({ target: { name: day, value: false } });
    });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        alignItems: "center"
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
          height: "100%",
        }}
      >
        <Stack
          spacing={4}
          direction="row"
          sx={{
            flexGrow: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <Typography variant="h5" sx={{ p: 2 }}>
              New Service
            </Typography>
            <Divider />
            <Stack spacing={2} sx={{ p: 3 }}
              component="form" onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                onChange={handleChange}
                value={values.address}
                error={errors.address}
                helperText={errors.address}
                sx={{ flexGrow: 1, maxWidth: "auto" }}
              />
              <TextField
                type="number"
                id="maximum_capacity"
                name="maximum_capacity"
                label="Capacity"
                onChange={handleChange}
                error={errors.maximum_capacity}
                helperText={errors.maximum_capacity}
                value={values.maximum_capacity}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
              <Stack
                spacing={2}
                direction="row"
              >
                <Typography variant="h6" sx={{ flexShrink: 0 }}>
                  Arrival Time
                </Typography>
                <TextField
                  fullWidth
                  id="arrival_hour"
                  name="arrival_hour"
                  label="Hour"
                  select
                  sx={{ flexGrow: 1 }}
                  value={values.arrival_hour}
                  error={errors.arrival_hour}
                helperText={errors.arrival_hour}
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: { PaperProps: { sx: { maxHeight: 200 } } },
                  }}
                >
                  {[...Array(24).keys()].map((n) => (
                    <MenuItem value={n}>{n}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  id="arrival_minute"
                  name="arrival_minute"
                  label="Minute"
                  select
                  sx={{ flexGrow: 1 }}
                  value={values.arrival_minute}
                  error={errors.arrival_minute}
                  helperText={errors.arrival_minute}
                  onChange={handleChange}
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
              >
                <Typography variant="h6" sx={{ flexShrink: 0 }}>
                  Return Time
                </Typography>
                <TextField
                  fullWidth
                  id="return_hour"
                  name="return_hour"
                  label="Hour"
                  select
                  sx={{ flexGrow: 1 }}
                  value={values.return_hour}
                  error={errors.return_minute}
                  helperText={errors.return_hour}
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: { PaperProps: { sx: { maxHeight: 200 } } },
                  }}
                >
                  {[...Array(24).keys()].map((n) => (
                    <MenuItem value={n}>{n}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  id="return_minute"
                  name="return_minute"
                  label="Minute"
                  select
                  sx={{ flexGrow: 1 }}
                  value={values.return_minute}
                  error={errors.return_minute}
                  helperText={errors.return_minute}
                  onChange={handleChange}
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
                  sx={{ flexGrow: 1, maxWidth: "50vh" }}
                >
                  Working Days
                </Typography>
                {daysOfWeek.map(
                  (day) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      id={day}
                      name={day}
                      key={day}
                      label={day.slice(0, 3)}
                      checked={values[day]}
                      onChange={event => handleWorkingDaysChange(event, day)}
                    />
                  )
                )}
                <Button onClick={clearWorkingDays} variant="text">
                  Clear All
                </Button>
              </Stack>
              <TextField
                label="Details"
                id="details"
                name="details"
                value={values.details}
                onChange={handleChange}
                error={errors.details}
                helperText={errors.details}
                fullWidth
                multiline
                rows={6}
              />
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "flex-end" }}
              >
                <Button onClick={() => navigate("/my/transportation")} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};
export default TransportationAddService;