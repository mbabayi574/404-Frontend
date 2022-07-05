import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import useForm from "useForm";

const NewFinancialEvent = (props) => {
  const { addEvent } = props;
  const callback = () => {
    addEvent(values);
    clearForm();
  }

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Please fill out the name";
    }
    if (!values.amount) {
      errors.amount = "Please fill out the amount of money";
    } else if (values.amount <= 0) {
      errors.amount = "The amount of money must be positive";
    }
    if (!values.period) {
      errors.period = "Please select a time period";
    }
    return errors;
  }

  const initialData = {
    name: "",
    amount: 0,
    type: "expense",
    period: "",
    date: new Date()
  };

  const {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors
  } = useForm(callback, validate, initialData);

  return (
    <Card sx={{
      width: "100%",
      height: "fit-content",
      py: 1, px: 2
    }}>
      <Typography variant="h6" sx={{ py: 1 }}>
        New Financial Event
      </Typography>
      <Divider />
      <Stack sx={{ mt: 1 }} spacing={1}
        component="form" onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name}
          fullWidth
          size="small"
        />
        <RadioGroup
          id="type"
          name="type"
          value={values.type}
          onChange={handleChange}
          defaultValue="expense"
          row
          sx={{
            width: "100%",
          }}
        >
          <FormControlLabel
            sx={{
              flexGrow: 1
            }}
            value="expense"
            control={<Radio />}
            label="Expense" />
          <FormControlLabel
            sx={{
              flexGrow: 1
            }}
            value="income"
            control={<Radio />}
            label="Income" />
        </RadioGroup>
        <TextField
          id="amount"
          name="amount"
          label="Amount"
          value={values.amount}
          onChange={handleChange}
          error={errors.amount}
          helperText={errors.amount}
          fullWidth
          required
          size="small"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                $
              </InputAdornment>
            )
          }}
        />
        <FormControl
          fullWidth
          size="small"
          error={errors.period}
        >
          <InputLabel id="period-label">Period</InputLabel>
          <Select
            labelId="period-label"
            id="period"
            name="period"
            label="Period"
            value={values.period}
            onChange={handleChange}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="annual">Annual</MenuItem>
            <MenuItem value="one-time">One Time</MenuItem>
          </Select>
          <FormHelperText>{errors.period}</FormHelperText>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date"
            value={values.date}
            inputFormat="MM/dd/yyyy"
            onChange={(value) => handleChange({ target: { name: "date", value: value } })}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
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