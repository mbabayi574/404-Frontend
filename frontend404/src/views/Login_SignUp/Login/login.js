import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import loginBackground from "images/login_background.jpg";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "App";

function Copyright(props) {
  return (
    <Typography align="center" {...props}>
      MADE WITH ❤️ IN 2022
    </Typography>
  );
}

function Login() {
  const {setToken, } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var request_data = JSON.stringify({
      username: data.get("phonenumber"),
      password: data.get("password"),
    });

    var config = {
      method: "post",
    //   url: "http://404g.pythonanywhere.com/auth/jwt/create/",
      url: "http://127.0.0.1:8000/auth/jwt/create/",
      headers: {
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if (response.status == 200) {
          setToken(response.data);
          // navigate("/my/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Grid
			container
			component="main"
			sx={{
				height: "100vh",
				backgroundImage: `url(${loginBackground})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				// backgroundSize: "contain",
				// backgroundSize: "100% 120%",
				// backgroundPosition: "center",
				backgroundPosition: "0% 100%",
			}}
		>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
					// backgroundImage: `url(${loginBackground})`,
          // backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "transparent",
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
          backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="phonenumber"
              label="Phone Number"
              name="phonenumber"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forget Your Password?? Click Here
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Do not have an account? Sign Up.
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
