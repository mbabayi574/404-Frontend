import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const NewFinancialEvent = () => {
  const [period, setPeriod] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (event) => {

  };

  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  }

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  }

  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      py: 1, px: 2
    }}>
      <Typography variant="h6" sx={{ py: 1 }}>
        New Financial Event
      </Typography>
      <Divider />
      <Stack sx={{ mt: 2 }} spacing={1.5}
        component="form" onSubmit={handleSubmit}
      >
        <TextField fullWidth size="small"
          name="name" id="name" label="Name" />
        <RadioGroup
          defaultValue="expense"
          id="type"
          name="type"
          row
          sx={{
            width: "100%",
          }}
        >
          <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          <FormControlLabel value="income" control={<Radio />} label="Income" />
        </RadioGroup>
        <TextField type="number" fullWidth size="small"
          name="amount" id="amount" label="Amount" />
        <FormControl fullWidth size="small">
          <InputLabel id="period-label">Period</InputLabel>
          <Select
            labelId="period-label"
            id="period"
            name="period"
            value={period}
            label="Period"
            onChange={handleChangePeriod}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="one-time">One Time</MenuItem>
          </Select>
        </FormControl>
        {
          period === "one-time" && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id="date"
                name="date"
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          )
        }
        <Button
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </Stack>
    </Card>
  )
};

export default NewFinancialEvent;