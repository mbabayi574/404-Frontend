import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Logout } from "@mui/icons-material";
import { height } from "@mui/system";
import NotificationList from './notificationList';
import TodoList from './todoList';
import ProfileCard from "./profileCard";
import profileImage from "../../data/profile-image.png"
import TimeTrackerCard from "./timeTrackerCard";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      bottom: 0,
      paddingTop: 10,
      marginLeft: -70,
      width: "100%",
      height: 40,
      textAlign: "left",
      marginTop: 30,
      position: "fixed",
      backgroundColor: "#e6e3e3",
    },
    copyRight: {
      textAlign: "left",
      marginLeft: 80,
    },
    container: {
      marginBottom: 50,
    },
  })
);

const Dashboard = () => {
  const mdTheme = createTheme();
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const AppBar =
    styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== "open",
    })
    (({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ marginRight: 2 }}
            >
              User Name
            </Typography>
            <IconButton color="inherit" sx={{ marginRight: 2 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{ mt: 4, mb: 4 }}
            className={classes.container}
          >
            <Grid container spacing={3}>
              <Grid item container direction="column" xs={4} spacing={3}>
                <Grid item>
                  <ProfileCard profile={{
                    image: profileImage,
                    name: "Diyar Hamedi",
                    role: "React Developer",
                    birthDate: "2002-8-18",
                    phoneNumber: "+98 930 454 3403",
                    email: "diyar_hamedi@comp.iust.ac.ir",
                    joinDate: "2019-9-23",
                    }}
                  />
                </Grid>
                <Grid item>
                  <TimeTrackerCard
                    time={{hours: 2, minutes: 18}}
                    expected={{hours: 8, minutes: 0}}
                    running={false}
                  />
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <NotificationList notifications={[
                  {title: "very long title which shows multiline titles are supported", date: "4-20"},
                  {title: "Title", date: "4-20"},
                  {title: "Title", date: "4-20"},
                  {title: "Title", date: "4-20"},
                  {title: "Title", date: "4-20"},
                ]}/>
              </Grid>
              <Grid item xs={4}>
                <TodoList todos={[
                  {title: "Title", priority: "low", done: true},
                  {title: "Title", priority: "lds", done: false},
                  {title: "Title", priority: "high", done: false},
                  {title: "Title", priority: "medium", done: true},
                  {title: "Title", priority: "high", done: true},
                ]}/>
              </Grid>
            </Grid>
            <div className={classes.footer}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                className={classes.copyRight}
              >
                {"Copyright © 404! Automation "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
