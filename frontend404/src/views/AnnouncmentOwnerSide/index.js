import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Layout from "./components/Layout";
import { Button, Grid, Paper, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const Access_Token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3Mzg3MDY0LCJqdGkiOiI0OWY2ZWMyODUzNzk0NWU5YTc0NjAwNTM3OWM1OTcxNSIsInVzZXJfaWQiOjV9.aqtWD-nPdzOzfQj3yrwgPlZdLb6HpFU_Y2EgiPJFdTc";

const RichtexteditorAnnouncment = ({}) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [openseccessfully, setOpenSeccessfully] = React.useState(false);

  const handleCloseSeccessfully = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSeccessfully(false);
  };

  const handleSubmit = () => {
    var request_data = {
      html_fields: content,
    };

    var config = {
      method: "post",
      url: "http://404g.pythonanywhere.com/BulletinBoard/post_bulletin_board",
      headers: {
        Authorization: "Bearer " + Access_Token,
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setContent("");
        setOpenSeccessfully(true);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(true);
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {`We have error :(`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openseccessfully}
        autoHideDuration={3000}
        onClose={handleCloseSeccessfully}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSeccessfully}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          {`Announcement sent successfully :)`}
        </Alert>
      </Snackbar>

      <Layout>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Paper style={{ margin: 16, padding: 16 }}>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              SEND ANNOUNCMENT
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default RichtexteditorAnnouncment;
