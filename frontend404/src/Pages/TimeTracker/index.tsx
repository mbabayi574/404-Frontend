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
import { Logout } from "@mui/icons-material";
import { height } from "@mui/system";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
    },
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

const TimeTracker = () => {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div></div>
    </div >
  );
}