import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useForm from "useForm";

const NewMeal = (props) => {
  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const { addMeal } = props;
  const callback = () => {
    addMeal(values);
    clearForm();
  }

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Please fill out the name";
    }
    if (!values.price) {
      errors.price = "Please fill out the price";
    } else if (values.price <= 0) {
      errors.price = "Price must be positive";
    }
    if (!values.day) {
      errors.day = "Please select a day";
    }
    return errors;
  }

  const initialData = {
    name: "",
    price: 0,
    day: "",
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
      height: "100%",
      py: 1, px: 2
    }}>
      <Typography variant="h6" sx={{ py: 1 }}>
        New Meal
      </Typography>
      <Divider />
      <Stack sx={{ mt: 2 }} spacing={2}
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
        <TextField
          id="price"
          name="price"
          label="Price"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
          helperText={errors.price}
          fullWidth
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
          error={errors.day}
        >
          <InputLabel id="day-label">Day to serve</InputLabel>
          <Select
            labelId="day-label"
            id="day"
            name="day"
            label="Day to serve"
            value={values.day}
            onChange={handleChange}
          >
            {daysOfWeek.map(day => (
              <MenuItem value={day.toLowerCase()}>
                {day}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.day}</FormHelperText>
        </FormControl>
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

export default NewMeal;