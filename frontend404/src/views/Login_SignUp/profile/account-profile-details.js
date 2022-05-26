import { useEffect, useState } from "react";
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
import axios from "axios";
import { border } from "@mui/system";

const api = axios.create({
  baseURL: "http://localhost:3000/profile",
});

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
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
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
const roles = [
  {
    value: "employee",
    label: "Employee",
  },
  {
    value: "company owner",
    label: "Company Owner",
  },
];
export const AccountProfileDetails = (props) => {
  const { history } = props;
  const [values, setValues] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/auth/users/me/", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODk4Nzk4LCJqdGkiOiI4MWM0NTY5ZDM2NzU0MTM3YjU0ZWU0Mzc4YjA4ZTFiNyIsInVzZXJfaWQiOjJ9.XhaXHoUUuZY3JpPzc5laUktlJVXNfOVEGbpE9Y3JfKo",
        },
      })
      .then((res) => {
        setValues({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
          phone: res.data.telephone,
          personalId: res.data.personal_Id,
          fatherName: res.data.father_full_name,
          motherName: res.data.mother_full_name,
          date: res.data.birthdate,
          company: res.data.company,
          degree: res.data.degreeـofـeducation,
          pcode: res.data.postal_code,
          address: res.data.address,
          mStatus: res.data.maritalـstatus,
          role: res.data.role,
          username: res.data.username,
        });
      });
  };
  const getSexuality = (sexuality) => {
    if (sexuality === "Male") return "M";
    if (sexuality === "Female") return "F";
    if (sexuality === "Other") return "O";
  };
  const getDegree = (degree) => {
    if (degree === "bachelor") return "B";
    if (degree === "Diploma") return "D";
    if (degree === "Master") return "M";
    if (degree === "Other") return "O";
  };

  const handleClick = () => {
    var request_data = JSON.stringify({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      telephone: values.phone,
      state: values.state,
      personal_Id: values.personalId,
      father_full_name: values.fatherName,
      mother_full_name: values.motherName,
      birthdate: values.data,
      company: values.company,
      degreeـofـeducation: getDegree(values.degree),
      postal_code: values.pcode,
      address: values.address,
      maritalـstatus: values.mStatus === "Single" ? "S" : "M",
      role: values.role === "Employee" ? "E" : "C",
      sexuality: getSexuality(values.sexuality),
      username: values.username,
    });

    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/auth/users/me/",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODk4Nzk4LCJqdGkiOiI4MWM0NTY5ZDM2NzU0MTM3YjU0ZWU0Mzc4YjA4ZTFiNyIsInVzZXJfaWQiOjJ9.XhaXHoUUuZY3JpPzc5laUktlJVXNfOVEGbpE9Y3JfKo",
      },
      data: request_data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
              <small>FirstName</small>
              <TextField
                fullWidth
                placeholder="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>LastName</small>
              <TextField
                fullWidth
                placeholder="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>UserName</small>

              <TextField
                fullWidth
                placeholder="UserName"
                helperText="Please specify the username"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Father's Name</small>

              <TextField
                fullWidth
                placeholder="Father's Name"
                name="FatherName"
                onChange={handleChange}
                required
                value={values.fatherName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Mother's Name</small>
              <TextField
                fullWidth
                placeholder="Mother's Name"
                name="MotherName"
                onChange={handleChange}
                required
                value={values.motherName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Email</small>
              <TextField
                fullWidth
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>BirthDate</small>

              <TextField
                variant=""
                fullWidth
                placeholder="birthDate"
                name="date"
                onChange={handleChange}
                required
                value={values.date}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <small>Phone Number</small>

              <TextField
                fullWidth
                placeholder="Phone Number"
                name="phone"
                onChange={handleChange}
                type="text"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Personal Id</small>

              <TextField
                fullWidth
                placeholder="Personal Id "
                name="personalId "
                onChange={handleChange}
                required
                value={values.personalId}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Address</small>

              <TextField
                fullWidth
                placeholder="Address"
                name="address"
                multiline
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Postal Code</small>

              <TextField
                fullWidth
                placeholder="Postal Code "
                name="pcode  "
                onChange={handleChange}
                required
                value={values.pcode}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Gender</small>

              <TextField
                fullWidth
                placeholder="Gender"
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
              <small>Role</small>

              <TextField
                fullWidth
                placeholder="Role"
                name="role"
                onChange={handleChange}
                required
                select
                value={values.role}
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <small>Marital Status</small>

              <TextField
                fullWidth
                placeholder="Marital Status"
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
              <small>Degree of education</small>

              <TextField
                fullWidth
                placeholder="Degree of education"
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
              <small>Company</small>

              <TextField
                fullWidth
                placeholder="Company"
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
          <Button
            onClick={() => handleClick()}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
