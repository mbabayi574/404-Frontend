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
    getStatistics(values);
  }

  const getQuickSelectStatistics = (range) => {
    handleChange({ target: { name: "startDate", value: range.startDate } });
    handleChange({ target: { name: "endDate", value: range.endDate } });
    getStatistics(range);
  }

  const getStatisticsOfLastMonth = () => {
    const startDate = getPreviousMonth();
    const endDate = new Date();
    getQuickSelectStatistics({
      startDate: startDate,
      endDate: endDate,
    });
  }
  const getStatisticsOfLast3Months = () => {
    const startDate = getPrevious3Months();
    const endDate = new Date();
    getQuickSelectStatistics({
      startDate: startDate,
      endDate: endDate,
    });
  }
  const getStatisticsOfLast6Months = () => {
    const startDate = getPrevious6Months();
    const endDate = new Date();
    getQuickSelectStatistics({
      startDate: startDate,
      endDate: endDate,
    });
  }
  const getStatisticsOfLastYear = () => {
    const startDate = getPreviousYear();
    const endDate = new Date();
    getQuickSelectStatistics({
      startDate: startDate,
      endDate: endDate,
    });
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

  const getPreviousMonth = () => {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }
  const getPrevious3Months = () => {
    let date = new Date();
    date.setDate(date.getDate() - 30 * 3);
    return date;
  }
  const getPrevious6Months = () => {
    let date = new Date();
    date.setDate(date.getDate() - 30 * 6);
    return date;
  }
  const getPreviousYear = () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
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
    <Stack>
      <Stack
        spacing={1}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          Select range
        </Typography>
        <Stack
          spacing={2}
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
        </Stack>
        <Typography
          variant="caption"
          color="error"
        >
          {errors.date}
        </Typography>
        <Button
          variant="contained"
          type="submit"
        >
          Select
        </Button>
      </Stack>
      <Stack
        spacing={1}
        sx={{
          mt: 3
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
        >
          Quick Select
        </Typography>
        <Button
          variant="outlined"
          onClick={() => getStatisticsOfLastMonth()}
        >
          Last 1 Month
        </Button>
        <Button
          variant="outlined"
          onClick={() => getStatisticsOfLast3Months()}
        >
          Last 3 Months
        </Button>
        <Button
          variant="outlined"
          onClick={() => getStatisticsOfLast6Months()}
        >
          Last 6 Months
        </Button>
        <Button
          variant="outlined"
          onClick={() => getStatisticsOfLastYear()}
        >
          This Year
        </Button>
      </Stack>
    </Stack>
  );
};

export default FinancialStatisticsDataSelection;