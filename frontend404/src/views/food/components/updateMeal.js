import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import useForm from "useForm";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

const UpdateMeal = (props) => {
  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const { selectedMeal, updateMeal, deleteMeal } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const callback = () => {
    console.log(values);
    updateMeal(values);
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
    return errors;
  }

  const {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors
  } = useForm(callback, validate, selectedMeal);

  useEffect(() => {
    clearForm();
  }, [selectedMeal]);

  const handleDelete = () => {
    setOpenDialog(false);
    deleteMeal(values.id);
  }

  const deleteDialog = (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete this meal? It will be lost forever.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );

  console.log(values);

  const form = (
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
        <Typography
        variant="body2"
        component="p"
        sx={{
          px: 1
        }}
        >
          This meal is served on {values.day.toLowerCase()}s.
        </Typography>
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
          onClick={() => setOpenDialog(true)}
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
  );


  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      py: 1, px: 2
    }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Typography variant="h6" sx={{ py: 1 }}>
          Update Meal
        </Typography>
      </Stack>
      <Divider />
      {selectedMeal ? form
        : (
          <Box sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Typography
              variant="h5"
              color="text.secondary"
            >
              Select meal to edit
            </Typography>
          </Box>
        )
      }
      {deleteDialog}
    </Card>
  )
};

export default UpdateMeal;