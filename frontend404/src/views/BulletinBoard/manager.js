import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Container,
  Typography,
  Stack,
  Card,
} from "@mui/material";
import useAPI from "useAPI";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";

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

  const [showData, setShowData] = React.useState(true);
  const [selected, setSelected] = React.useState(false);
  const [selectedAnnouncment, setSelectedAnnouncment] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([
    { title: "title one", desc: "<h1>hello</h1>" },
    { title: "title two", desc: "<p>desc of p tag</p>" },
    { title: "p one", desc: "<p>its a test just in case</p>" },
    { title: "image", desc: "<img src={} alt='image alt'/>" },
    { title: "another head", desc: "another head in desc" },
    { title: "title one", desc: "<h1>hello</h1>" },
    { title: "title two", desc: "<p>desc of p tag</p>" },
    { title: "p one", desc: "<p>its a test just in case</p>" },
    { title: "image", desc: "<img src={} alt='image alt'/>" },
    { title: "another head", desc: "another head in desc" },
  ]);
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
  ];

  //   data.map((item, index) => rows.push({ id: index + 1, title: item.title }))
  React.useEffect(() => {
    initialize();
  }, []);

  const handleCellClick = (c) => {
    data.map((item, index) => {
      if (c.row.id === index + 1) {
        setSelectedAnnouncment(item);
        setSelected(true);
      }
    });
  };

  const initialize = () => {
    // data.splice(0, data.length)
    api({
      method: "get",
      url: "BulletinBoard/get_bulletin_board",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("inside the succesful response");
        console.log("response: ", response);
        setData(response.data);
        setRows(
          response.data.map((item, index) => ({
            id: index + 1,
            title: item.title || "No title",
          }))
        );
        setShowData(true);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
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
          </Grid>
        </Grid>
      </Container>

      {/*  */}
      <Fragment>
        <Paper
          elevation={0}
          style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                width: "90%",
                height: "80vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={0} style={{ padding: 32 }}>
              <Grid item xs={4} md={16}>
                <Card>
                  <Grid container spacing={15} style={{ padding: 32 }}>
                    <Grid item sx={4} md={4}>
                      <Typography style={{ padding: 15 }} variant="h6">
                        Announcments
                      </Typography>
                      {showData ? (
                        <div
                          style={{
                            height: 530,
                            width: "100%",
                            paddingLeft: 30,
                            paddingRight: 0,
                          }}
                        >
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={8}
                            onCellClick={(c) => handleCellClick(c)}
                          />
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item sx={4} md={7}>
                      {selected ? (
                        <Box
                          sx={{
                            width: 850,
                            height: 600,
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <Stack spacing={0}>
                            <Typography
                              style={{ padding: 24, fontSize: 20 }}
                              variant="h6"
                            >
                              {selectedAnnouncment.title || "No title"}
                            </Typography>
                            <Box
                              sx={{
                                px: 3,
                                py: 1,
                                width: "100%",
                                height: "100%",
                                overflow: "auto",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: selectedAnnouncment.html_fields,
                                }}
                                style={{
                                  width: "100%",
                                  height: "50vh",
                                  overflowY: "auto",
                                }}
                              />
                            </Box>
                          </Stack>
                        </Box>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={850}
                          height={600}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Fragment>

      {/*  */}
    </>
  );
};

export default BulletinBoardManager;
