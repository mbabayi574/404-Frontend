import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import useForm from "useForm";

const FinancialStatisticsDataSelection = (props) => {
  const { getStatistics } = props;
  const callback = () => {
    console.log(values); 
  }

  const validate = (values) => {
    let errors = {};
    const startDateValue = values.startDate.valueOf();
    const endDateValue = values.endDate.valueOf();
    const todayValue = new Date().valueOf();
    if (startDateValue > endDateValue) {
      errors.date = "Start date must be before end date";
    } else if (endDateValue > todayValue) {
      errors.date = "End date must be in past or present day";
    }
    return errors;
  }

  const getStartOfTheYear = () => {
    let date = new Date();
    date.setDate(1);
    date.setMonth(0);
    return date;
  }

  const initialData = {
    startDate: getStartOfTheYear(),
    endDate: new Date(),
  };

  const {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors
  } = useForm(callback, validate, initialData);

  return (
    <Stack spacing={1}>
      <Typography variant="h6">
        Select range
      </Typography>
      <Stack
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
      >
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Start Date"
            value={values.startDate}
            inputFormat="MM/dd/yyyy"
            onChange={(value) => handleChange({ target: { name: "startDate", value: value } })}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="End Date"
            value={values.endDate}
            inputFormat="MM/dd/yyyy"
            onChange={(value) => handleChange({ target: { name: "endDate", value: value } })}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          type="submit"
        >
          Select
        </Button>
      </Stack>
      <Typography
        variant="caption"
        color="error"
      >
        {errors.date}
      </Typography>
    </Stack>
  );
};

export default FinancialStatisticsDataSelection;