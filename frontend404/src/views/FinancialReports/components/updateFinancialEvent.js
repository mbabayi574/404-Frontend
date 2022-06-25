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

const UpdateFinancialEvent = () => {
  const updateData = () => {
    console.log(values);
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
    return errors;
  }

  const {
    handleChange,
    handleSubmit,
    values,
    errors
  } = useForm(updateData, validate);

  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      py: 1, px: 2
    }}>
      <Typography variant="h6" sx={{ py: 1 }}>
        Update Financial Event
      </Typography>
      <Divider />
      <Stack sx={{ mt: 2 }} spacing={1.5}
        component="form" onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          value={values.name || ""}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name}
          fullWidth
          size="small"
        />
        <RadioGroup
          id="type"
          name="type"
          value={values.type || "expense"}
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
          value={values.amount || 0}
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
        <Stack
          direction="row"
          sx={{
            width: "100%"
          }}
        >
          <Button
            sx={{
              flexGrow: 1
            }}
          >
            Delete
          </Button>
          <Button
            sx={{
              flexGrow: 1
            }}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
};

export default UpdateFinancialEvent;