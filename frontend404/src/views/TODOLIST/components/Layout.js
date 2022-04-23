import React from "react";
import { AppBar, Toolbar, Typography, Paper } from "@mui/material";

const Layout = React.memo(({ children }) => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
  >
    <AppBar color="primary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64 }}>
        <Typography color="inherit">ToDo APP</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </Paper>
));

export default Layout;
