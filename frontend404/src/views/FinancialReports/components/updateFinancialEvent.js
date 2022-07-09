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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState, useEffect } from "react";

const UpdateFinancialEvent = (props) => {
  const { selectedEvent, updateEvent, deleteEvent } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const callback = () => {
    console.log(values);
    updateEvent(values);
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

  const initialData = {
    name: selectedEvent?.name,
    amount: Math.abs(parseFloat(selectedEvent?.amount)),
    date_period: selectedEvent?.date_period,
  };

  const type = selectedEvent?.type_report;
  const period = selectedEvent?.period;

  const {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors
  } = useForm(callback, validate, initialData);

  useEffect(() => {
    clearForm();
  }, [selectedEvent]);

  const handleDelete = () => {
    setOpenDialog(false);
    deleteEvent();
  }

  const deleteDialog = (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete this event? It will be lost forever.
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

  const form = (
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
        InputLabelProps={{ shrink: values.name }}
        fullWidth
        size="small"
      />
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date"
          value={values.date_period}
          inputFormat="MM/dd/yyyy"
          onChange={(value) => handleChange({ target: { name: "date_period", value: value } })}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>
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
        sx={{ alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ py: 1 }}>
          Update Financial Event
        </Typography>
        <Typography variant="subtitle2">
          {period} {type}
        </Typography>
      </Stack>
      <Divider />
      {selectedEvent ? form
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
              Select financial event to edit
            </Typography>
          </Box>
        )
      }
      {deleteDialog}
    </Card>
  )
};

export default UpdateFinancialEvent;