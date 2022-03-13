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
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props: any) {
  return (
    <div dir="rtl">
      <Typography align="center" {...props}>
        ساخته شده با ❤️ در ۱۴۰۱
      </Typography>
    </div>
  );
}

const theme = createTheme({
  direction: "rtl",
});

function SignUp() {
  const [registrant_role, setRegistrant_Role] = React.useState("owner");

  const handle_Role_Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrant_Role((event.target as HTMLInputElement).value);
  };

  const companies = ["BMW Co", "Mazmaz Company", "Pepsi"];

  const [company, setCompany] = React.useState("BMW Co");

  const handleChangeCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            ثبت نام
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div dir="rtl">
                  <FormControl>
                    <FormLabel id="registrant-role-radio-buttons-group">
                      نقش :
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
                        label="کارگذار"
                      />
                      <FormControlLabel
                        value="employee"
                        control={<Radio />}
                        label="کارمند"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="نام"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="نام خانوادگی"
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
                      label="نام شرکت"
                      name="company-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="company-biography"
                      label="بیوگرافی شرکت"
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
                  label="تلفن همراه"
                  name="phonenumber"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="رمز عبور"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {registrant_role === "employee" && (
                <React.Fragment>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-select-copany"
                      select
                      label="انتخاب"
                      value={company}
                      onChange={handleChangeCompany}
                      helperText="شرکت خود را انتخاب کنید"
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
              ثبت نام
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  حساب کاربری دارید؟ وارد شوید
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const Signup_Company = () => {
  return <SignUp />;
};

export default Signup_Company;
