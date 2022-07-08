import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import useAPI from "useAPI";
import BulletinBoardEmployee from "./employee";

const BulletinBoardManager = ({}) => {
  const editor = useRef(null);
  const api = useAPI();
  const [title, setTitle] = useState("");
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
      title: title,
      html_fields: content,
    };

    var config = {
      method: "post",
      url: "BulletinBoard/post_bulletin_board",
      headers: {
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    api(config)
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

  //
  //
  //

  ///

  /////////////

  const [value, setValue] = React.useState(false);

  const handleChange = (event) => {
    setValue(!value);
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
      {value ? (
        <Container>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Paper style={{ margin: 16, padding: 16 }}>
                <TextField
                  label="Title"
                  size="small"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div style={{ marginBottom: "10px" }}></div>
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
              <Button onClick={handleChange} fullWidth>
                History
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <div>
            <Button
              variant="contained"
              style={{
                width: "15vw",
                float: "right",
                marginTop: "3vh",
                marginRight: "3.5vw",
              }}
              onClick={handleChange}
            >
              Send New Announcement
            </Button>
          </div>
          {/*  */}
          <div style={{ marginTop: "-7vh" }}>
            <BulletinBoardEmployee />
          </div>
          {/*  */}
        </>
      )}
    </>
  );
};

export default BulletinBoardManager;
