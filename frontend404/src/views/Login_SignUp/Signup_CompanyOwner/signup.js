import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography align="center" {...props}>
      MADE WITH ❤️ IN 2022
    </Typography>
  );
}

function SignUp() {
  let navigate = useNavigate();

  const [registrant_role, setRegistrant_Role] = React.useState("owner");

  const handle_Role_Change = (event) => {
    setRegistrant_Role(event.target.value);
  };

  const companies = ["BMW Co", "Mazmaz Company", "Pepsi"];

  const [company, setCompany] = React.useState("BMW Co");

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (registrant_role === "owner") {
      var request_data = JSON.stringify({
        company: {
          company_name: data.get("company-name"),
          company_biography: data.get("company-biography"),
        },
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        phone: data.get("phonenumber"),
        email: data.get("email"),
        password: data.get("password"),
      });

      var config = {
        method: "post",
        url: "http://404g.pythonanywhere.com/api/company-owner/signup/",
        headers: {
          "Content-Type": "application/json",
        },
        data: request_data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (registrant_role === "employee") {
      var employeerequest_data = JSON.stringify({
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        username: data.get("phonenumber"),
        email: data.get("email"),
        company: "uu",
        password: data.get("password"),
      });
      console.log('employeerequest_data: ', employeerequest_data);
      var employeeconfig = {
        method: "post",
        url: "http://404g.pythonanywhere.com/api/employee/signup/",
        headers: {
          "Content-Type": "application/json",
        },
        data: employeerequest_data,
      };
      axios(employeeconfig)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://s6.uupload.ir/files/signupbgcolor_l3ar.png)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Card>
          <div style={{ padding: "10px" }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                SignUp
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="registrant-role-radio-buttons-group">
                        Role :
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="registrant-role-radio-buttons-group"
                        name="registrant-role-buttons-group"
                        value={registrant_role}
                        onChange={handle_Role_Change}
                      >
                        <FormControlLabel
                          value="owner"
                          control={<Radio />}
                          label="Owner"
                        />
                        <FormControlLabel
                          value="employee"
                          control={<Radio />}
                          label="Employee"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="FirstName"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="LastName"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  {registrant_role === "owner" && (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="company-name"
                          label="Company Name"
                          name="company-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="company-biography"
                          label="Company Biography"
                          name="company-biography"
                          multiline
                        />
                      </Grid>
                    </React.Fragment>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phonenumber"
                      label="PhoneNumber"
                      name="phonenumber"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  {registrant_role === "employee" && (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-select-company"
                          select
                          label="Select"
                          value={company}
                          onChange={handleChangeCompany}
                          helperText="Select Your Company:"
                          fullWidth
                        >
                          {companies.map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </React.Fragment>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Do you have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </div>
        </Card>
      </Container>
    </div>
  );
}

const Signup_Company = () => {
  return <SignUp />;
};

export default Signup_Company;
