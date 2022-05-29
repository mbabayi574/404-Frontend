import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useAPI from "useAPI";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Copyright(props) {
  return (
    <Typography align="center" {...props}>
      MADE WITH ❤️ IN 2022
    </Typography>
  );
}

function SignUp() {
  const api = useAPI();
  let navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [registrantRole, setRegistrantRole] = useState("owner");
  const [value, setValue] = useState(0);

  const handleChangeRole = (event, newValue) => {
    const new_role_value = newValue == 0 ? "owner" : "employee";
    setRegistrantRole(new_role_value);
    setValue(newValue);
  };

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (registrantRole === "owner") {
      var request_data = JSON.stringify({
        company: {
          company_name: data.get("company-name"),
          company_biography: data.get("company-biography"),
        },
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        username: data.get("phonenumber"),
        email: data.get("email"),
        password: data.get("password"),
      });

      var config = {
        method: "post",
        url: "api/company-owner/signup/",
        headers: {
          "Content-Type": "application/json",
        },
        data: request_data,
      };

      api(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (registrantRole === "employee") {
      var employeerequest_data = JSON.stringify({
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        username: data.get("phonenumber"),
        email: data.get("email"),
        company: company,
        password: data.get("password"),
      });
      var employeeconfig = {
        method: "post",
        url: "api/employee/signup/",
        headers: {
          "Content-Type": "application/json",
        },
        data: employeerequest_data,
      };
      api(employeeconfig)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    api({
      url: "api/getallcompany/"
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        setCompanies(response.data.map(company => company.company_name));
      }
    })
  }, [])

  return (
    <div
      style={{
        backgroundImage:
          "url(https://supremepools.com.au/wp-content/uploads/2016/06/supreme-pools-free-pool-magazine-background-large.jpg)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container component="main" maxWidth="sm">
        <Card sx={{ height: "80vh", width: "100%", p: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: registrantRole === "owner" ? "primary.main" : "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                px: 2,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto"
              }}
            >
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Tabs
                sx={{ width: "100%", mt: 1 }}
                value={value}
                onChange={handleChangeRole}
                aria-label="role type"
              >
                <Tab sx={{ width: "50%" }} label="Manager" {...a11yProps(0)} />
                <Tab sx={{ width: "50%" }} label="Employee" {...a11yProps(1)} />
              </Tabs>
              <Grid container sx={{ width: "100%", mt: 2 }} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phonenumber"
                    label="Phone Number"
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
                {registrantRole === "owner" && (
                  <>
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
                  </>
                )}
                {registrantRole === "employee" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-select-company"
                        select
                        label="Select Your Company"
                        value={company || ''}
                        onChange={handleChangeCompany}
                        fullWidth
                      >
                        {companies.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </>
                )}
              </Grid>
              <Box sx={{ flexGrow: 1, maxHeight: "auto" }} />
              <Grid sx={{ width: "100%", mt: 0.5, mb: 1 }} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    // item
                    type="submit"
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    // item
                    onClick={() => {
                      navigate("/login");
                    }}
                    variant="outlined"
                    sx={{ width: "100%" }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mb: 3 }} />
          </Box>
        </Card>
      </Container>
    </div >
  );
}

const Signup_Company = () => {
  return <SignUp />;
};

export default Signup_Company;
