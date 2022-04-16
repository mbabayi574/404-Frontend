import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];
const genders = [
  {
    value: "gender",
    label: "Gender",
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];
const degrees = [
  {
    value: "diploma",
    label: "Diploma",
  },
  {
    value: "bachelor",
    label: "Bachelor",
  },
  {
    value: "master",
    label: "Master",
  },
  {
    value: "other",
    label: "Other",
  },
];
const mStatuses = [
  {
    value: "single",
    label: "Single",
  },
  {
    value: "maried",
    label: "Maried",
  },
];
export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: "Babak",
    lastName: "Behkam",
    email: "Bbehkam12@gmail.com",
    phone: "09123459876",
    state: "Alabama",
    personalId: "4831031234",
    fatherName: "rajab",
    date: "2021/3/5",
    company: "mihan",
    degree: "Master",
    pcode: "456784245",
    address: "Tabriz-emam street-pelak4 ",
    mStatus: "Single",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Father's Name"
                name="FatherName"
                onChange={handleChange}
                required
                value={values.fatherName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant=""
                fullWidth
                label="birthDate"
                name="date"
                onChange={handleChange}
                required
                value={values.date}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="text"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Personal Id "
                name="personalId "
                onChange={handleChange}
                required
                value={values.personalId}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Postal Code "
                name="pcode  "
                onChange={handleChange}
                required
                value={values.pcode}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                onChange={handleChange}
                required
                select
                value={values.gender}
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {genders.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Marital Status"
                name="mStatus"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.mStatus}
                variant="outlined"
              >
                {mStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Degree of education"
                name="degree"
                onChange={handleChange}
                select
                required
                SelectProps={{ native: true }}
                value={values.degree}
                variant="outlined"
              >
                {degrees.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                onChange={handleChange}
                required
                value={values.company}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
