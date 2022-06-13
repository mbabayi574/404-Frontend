import * as React from "react";
import Card from "@mui/material/Card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Fragment } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Skeleton from "@mui/material/Skeleton";
// import { TokenContext } from "App";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {
  Grid,
  List,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import useAPI from "useAPI";

const ServiceCounterEmp = (props) => {
  const api = useAPI();
  const [selected, setSelected] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [options, setOptions] = React.useState([
    {
      title: "op1",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "" },
        { type: "text", value: "end date" },
        { type: "text field", value: "" },
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "op2",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "" },
        { type: "text", value: "end date" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "op3",
      form: [
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "op4",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "" },
        { type: "text", value: "end date" },
        { type: "text field", value: "" },
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "op5",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "" },
        { type: "text", value: "end date" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "op6",
      form: [
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
  ]);
  const [onGoings, setOnGoings] = React.useState([
    {
      title: "op1",
      user: "userName",
      status: "pending",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "12/4/2022" },
        { type: "text", value: "end date" },
        { type: "text field", value: "20/4/2022" },
        { type: "text", value: "extra description" },
        {
          type: "text field",
          value: "my wife is pregnant i need to take care of her",
        },
      ],
    },
    {
      title: "op4",
      user: "userName",
      status: "accepted",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "1/1/2022" },
        { type: "text", value: "end date" },
        { type: "text field", value: "2/1/2022" },
      ],
    },
    {
      title: "op5",
      user: "userName",
      status: "declined",
      form: [
        { type: "text", value: "extra description" },
        { type: "text field", value: "I need you to raise my salary" },
      ],
    },
  ]);
  const [list] = React.useState([]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogMessage("");
  };

  React.useEffect(() => {
    fillList();
    // initialize();
  }, []);

  const fillList = () => {
    list.splice(0, list.length);
    options.map((option) => {
      let state = "";
      let tempForm = option.form;
      onGoings.map((req) => {
        if (req.title === option.title) {
          state = req.status;
          tempForm = req.form;
        }
      });
      list.push({ title: option.title, form: tempForm, status: state });
    });
    console.log("list is : ", list);
    setIsLoading(false);
  };

  const handleOptionClick = (item) => {
    setSelectedItem(item);
    setSelected(true);
  };

  const initialize = () => {
    // Options
    api({
      method: "get",
      url: "serviceCounter/Options/get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("response: ", response);
        setOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log(options);
      });

    //OnGoings
    api({
      method: "get",
      url: "serviceCounter/OnGoings/get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("response: ", response);
        setOnGoings(response.data);
        fillList();
      })
      .catch(function (error) {
        console.log(error);
        console.log(onGoings);
      });
  };

  const sendRequestHandler = () => {
    let flag = false;
    selectedItem.form.map((item) => {
      if (item.value === "") flag = true;
    });
    if (flag) {
      setDialogMessage("please fill out the fields");
      setDialogOpen(true);
    } else {
      api({
        method: "post",
        url: "serviceCounter/onGoings/post",
        headers: {
          "Content-Type": "applicatin/json",
        },
        data: selectedItem,
      })
        .then(function (response) {
          console.log(response);
          setSelected(false);
          setSelectedItem(null);
          setIsOpenSnackbar(true);
          initialize();
          fillList();
        })
        .catch(function (error) {
          console.log(error);
          setDialogMessage("couldnt create the request");
          setDialogOpen(true);
        });
    }
  };

  const closeReqHandler = () => {
    api({
      method: "delete",
      url: "serviceCounter/OnGoings/delete",
      headers: {
        "Content-Type": "applicatin/json",
      },
      data: { title: selectedItem.title },
    })
      .then(function (response) {
        console.log(response);
        setSelected(false);
        setSelectedItem(null);
        initialize();
        fillList();
      })
      .catch(function (error) {
        console.log(error);
        setDialogMessage("couldnt close the request");
        setDialogOpen(true);
      });
  };

  const menuBar = () =>
    list.map((item) => {
      if (item.status === "pending")
        return (
          <div onClick={() => handleOptionClick(item)}>
            <MenuItem>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography>{item.title}</Typography>
                <Typography
                  style={{
                    paddingLeft: 15,
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "gray",
                  }}
                >
                  {item.status}
                </Typography>
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </div>
        );
      if (item.status === "accepted")
        return (
          <div onClick={() => handleOptionClick(item)}>
            <MenuItem>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography>{item.title}</Typography>
                <Typography
                  style={{ paddingLeft: 15, fontSize: 13, color: "green" }}
                >
                  {item.status}
                </Typography>
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </div>
        );
      if (item.status === "declined")
        return (
          <div onClick={() => handleOptionClick(item)}>
            <MenuItem>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography>{item.title}</Typography>
                <Typography
                  style={{ paddingLeft: 15, fontSize: 13, color: "red" }}
                >
                  {item.status}
                </Typography>
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </div>
        );
      return (
        <div onClick={() => handleOptionClick(item)}>
          <MenuItem>
            <Typography>{item.title}</Typography>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
        </div>
      );
    });

  const formGenerator = (element, i) => {
    const { type, value } = element;
    if (type === "text field")
      return (
        <TextField
          multiline
          variant="outlined"
          style={{ margin: 5 }}
          disabled={selectedItem.status.length > 0 ? true : false}
          value={value}
          onChange={(e) => {
            const tempSelected = {
              title: selectedItem.title,
              status: selectedItem.status,
              form: [],
            };
            selectedItem.form.map((item, index) => {
              if (index === i)
                tempSelected.form.push({
                  type: item.type,
                  value: e.target.value,
                });
              else tempSelected.form.push(item);
            });
            setSelectedItem(tempSelected);
          }}
        />
      );
    return <Typography style={{ margin: 5 }}>{value}</Typography>;
  };

  const rightSideHandler = () => {
    if (selectedItem.status === "pending")
      return (
        <div style={{ paddingTop: 40 }}>
          <Button variant="contained" disabled>
            Send Request
          </Button>
          <Grid
            container
            style={{
              marginTop: 90,
            }}
            spacing={4}
          >
            <Grid item>
              <Typography
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 8,
                  padding: 5,
                  fontWeight: "bold",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                <span style={{ color: "black", fontStyle: "normal" }}>
                  status:{" "}
                </span>{" "}
                {selectedItem.status}...
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </div>
      );
    if (selectedItem.status === "accepted")
      return (
        <div style={{ paddingTop: 40 }}>
          <Button variant="contained" disabled>
            Send Request
          </Button>
          <Grid container style={{ marginTop: 90 }} spacing={4}>
            <Grid item>
              <Typography
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 8,
                  padding: 5,
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                <span style={{ color: "black", fontStyle: "normal" }}>
                  status:{" "}
                </span>{" "}
                {selectedItem.status}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => closeReqHandler()}>
                Close Request
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    if (selectedItem.status === "declined")
      return (
        <div style={{ paddingTop: 40 }}>
          <Button variant="contained" disabled>
            Send Request
          </Button>
          <Grid container style={{ marginTop: 90 }} spacing={4}>
            <Grid item>
              <Typography
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 8,
                  padding: 5,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                <span style={{ color: "black", fontStyle: "normal" }}>
                  status:{" "}
                </span>{" "}
                {selectedItem.status}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => closeReqHandler()}>
                Close Request
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    return (
      <div style={{ paddingTop: 40 }}>
        <Button variant="contained" onClick={() => sendRequestHandler()}>
          Send Request
        </Button>
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            <Grid
              container
              spacing={0}
              style={{ paddingLeft: 32, paddingTop: 10, paddingRight: 20 }}
            >
              <Grid item xs={4} md={16}>
                <Card>
                  <Grid container spacing={5} style={{ padding: 32 }}>
                    <Grid item sx={4} md={2}>
                      <Typography style={{ padding: 15 }} variant="h6">
                        Options
                      </Typography>
                      {list && list.length > 0 ? (
                        <MenuList
                          style={{
                            overflow: "auto",
                            paddingBottom: 20,
                            height: 450,
                          }}
                        >
                          {menuBar(list)}
                        </MenuList>
                      ) : (
                        <>no item show</>
                      )}
                    </Grid>
                    <Grid item sx={4} md={7}>
                      {selected ? (
                        <Card
                          sx={{
                            width: 850,
                            height: 600,
                            padding: 1,
                            paddingBottom: 1,
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <Card
                            sx={{
                              backgroundColor: "#fffff",
                              height: 580,
                            }}
                          >
                            <Grid
                              style={{
                                padding: 10,
                                paddingLeft: 60,
                              }}
                              container
                              spacing={10}
                            >
                              <Grid item md={5}>
                                <Typography
                                  style={{ padding: 15 }}
                                  variant="h6"
                                >
                                  {selectedItem.title}
                                </Typography>
                                <List sx={{ overflow: "auto", maxHeight: 500 }}>
                                  {selectedItem.form.map((item, index) =>
                                    formGenerator(item, index)
                                  )}
                                </List>
                              </Grid>
                              <Grid item md={7} style={{ marginTop: 30 }}>
                                {rightSideHandler()}
                              </Grid>
                            </Grid>
                          </Card>
                        </Card>
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

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            style: {
              position: "relative",
              borderRadius: 12,
            },
          }}
        >
          <DialogContent>{dialogMessage}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>OK</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={isOpenSnackbar}
          autoHideDuration={2000}
          onClose={() => {
            setIsOpenSnackbar(false);
          }}
        >
          <Alert
            onClose={() => {
              setIsOpenSnackbar(false);
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            Date Stored successfuly!
          </Alert>
        </Snackbar>
      </Fragment>
    </LocalizationProvider>
  );
};

export default ServiceCounterEmp;
