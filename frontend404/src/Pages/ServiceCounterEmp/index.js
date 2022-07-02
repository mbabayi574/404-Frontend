import * as React from "react";
import Card from "@mui/material/Card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Fragment } from "react";
import RequestHistory from "./reqHistory";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Skeleton from "@mui/material/Skeleton";
// import { TokenContext } from "App";
import { DesktopDatePicker as DatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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
      title: "Vacation request",
      form: [
        { type: "text", value: "since" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "till" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "Reason" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Salary raise",
      form: [
        { type: "text", value: "How much" },
        { type: "text field", value: "" },
        { type: "text", value: "description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Loan request",
      form: [
        { type: "text", value: "How much" },
        { type: "text field", value: "" },
        { type: "text", value: "Return in how many months?" },
        { type: "text field", value: "" },
        { type: "text", value: "Payment amount" },
        { type: "text field", value: "" },
        { type: "text", value: "description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Quit request",
      form: [
        { type: "text", value: "Quit date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "Reason" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Equipment request",
      form: [
        { type: "text", value: "Needed equipments" },
        { type: "text field", value: "" },
        { type: "text", value: "how many" },
        { type: "text field", value: "" },
        { type: "text", value: "Description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Other requests",
      form: [
        { type: "text", value: "Request" },
        { type: "text field", value: "" },
      ],
    },
  ]);
  const [onGoings, setOnGoings] = React.useState([
    {
      title: "Vacation request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "pending",
      form: [
        { type: "text", value: "start date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "end date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "time" },
        { type: "time picker", value: new Date() },
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Quit request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "accepted",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "1/1/2022" },
        { type: "text", value: "end date" },
        { type: "text field", value: "2/1/2022" },
      ],
    },
    {
      title: "Equipment request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "declined",
      form: [
        { type: "text", value: "extra description" },
        { type: "text field", value: "I need you to raise my salary" },
      ],
    },
    {
      title: "Vacation request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "pending",
      form: [
        { type: "text", value: "start date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "end date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "time" },
        { type: "time picker", value: new Date() },
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Quit request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "accepted",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "1/1/2022" },
        { type: "text", value: "end date" },
        { type: "text field", value: "2/1/2022" },
      ],
    },
    {
      title: "Equipment request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "declined",
      form: [
        { type: "text", value: "extra description" },
        { type: "text field", value: "I need you to raise my salary" },
      ],
    },
    {
      title: "Vacation request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "pending",
      form: [
        { type: "text", value: "start date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "end date" },
        { type: "date picker", value: new Date() },
        { type: "text", value: "time" },
        { type: "time picker", value: new Date() },
        { type: "text", value: "extra description" },
        { type: "text field", value: "" },
      ],
    },
    {
      title: "Quit request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "accepted",
      form: [
        { type: "text", value: "start date" },
        { type: "text field", value: "1/1/2022" },
        { type: "text", value: "end date" },
        { type: "text field", value: "2/1/2022" },
      ],
    },
    {
      title: "Equipment request",
      user: "userName",
      reqDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      status: "declined",
      form: [
        { type: "text", value: "extra description" },
        { type: "text field", value: "I need you to raise my salary" },
      ],
    },
  ]);
  const [showReport, setShowReport] = React.useState(true); // it should change to false

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogMessage("");
  };

  React.useEffect(() => {
    console.log("onGoings: ", onGoings);
    // fillList();
    // initialize();
    setIsLoading(false);
  }, []);

  // const fillList = () => {
  //   list.splice(0, list.length);
  //   options.map((option) => {
  //     let state = "";
  //     let tempForm = option.form;
  //     onGoings.map((req) => {
  //       if (req.title === option.title) {
  //         state = req.status;
  //         tempForm = req.form;
  //       }
  //     });
  //     list.push({ title: option.title, form: tempForm, status: state });
  //   });
  //   console.log("list is : ", list);
  //   setIsLoading(false);
  // };

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
        setShowReport(true);
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
        // fillList();
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
          // fillList();
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
        // fillList();
      })
      .catch(function (error) {
        console.log(error);
        setDialogMessage("couldnt close the request");
        setDialogOpen(true);
      });
  };

  const optionsBar = () =>
    options.map((item) => {
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
          style={{ margin: 5, width: 240 }}
          value={value}
          onChange={(e) => {
            const tempSelected = {
              title: selectedItem.title,
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
    if (type === "date picker")
      return (
        <DatePicker
          value={value}
          onChange={(e) => {
            const tempSelected = {
              title: selectedItem.title,
              form: [],
            };
            selectedItem.form.map((item, index) => {
              if (index === i)
                tempSelected.form.push({
                  type: item.type,
                  value: e,
                });
              else tempSelected.form.push(item);
            });
            setSelectedItem(tempSelected);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    if (type === "time picker")
      return (
        <TimePicker
          value={value}
          onChange={(e) => {
            const tempSelected = {
              title: selectedItem.title,
              form: [],
            };
            selectedItem.form.map((item, index) => {
              if (index === i)
                tempSelected.form.push({
                  type: item.type,
                  value: e,
                });
              else tempSelected.form.push(item);
            });
            setSelectedItem(tempSelected);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    return <Typography style={{ margin: 5 }}>{value}</Typography>;
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
              spacing={4}
              style={{
                paddingLeft: 32,
                paddingTop: 30,
                paddingRight: 10,
              }}
            >
              <Grid item xs={4} md={7}>
                <Card>
                  <Grid container spacing={5} style={{ padding: 32 }}>
                    <Grid item sx={4} md={3.5}>
                      <Typography style={{ padding: 15 }} variant="h6">
                        Options
                      </Typography>
                      {options && options.length > 0 ? (
                        <MenuList
                          style={{
                            overflow: "auto",
                            paddingBottom: 20,
                            height: 450,
                          }}
                        >
                          {optionsBar(options)}
                        </MenuList>
                      ) : (
                        <>no item show</>
                      )}
                    </Grid>
                    <Grid item sx={4} md={5}>
                      {selected ? (
                        <Grid
                          sx={{
                            width: 450,
                            height: 550,
                            padding: 1,
                            paddingBottom: 1,
                            // backgroundColor: "#fafafa",
                          }}
                        >
                          <Grid
                            sx={{
                              // backgroundColor: "#fffff",
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
                              <Grid item md={7}>
                                <Typography
                                  style={{ padding: 15 }}
                                  variant="h6"
                                >
                                  {selectedItem.title}
                                </Typography>
                                <List
                                  sx={{
                                    overflow: "auto",
                                    maxHeight: 400,
                                    width: 400,
                                  }}
                                >
                                  {selectedItem.form.map((item, index) =>
                                    formGenerator(item, index)
                                  )}
                                </List>
                                <div style={{ paddingTop: 40 }}>
                                  <Button
                                    variant="contained"
                                    onClick={() => sendRequestHandler()}
                                  >
                                    Send Request
                                  </Button>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={450}
                          height={550}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={4} md={4.5}>
                <Card style={{ width: "100%", height: "100%" }}>
                  {" "}
                  <Typography style={{ padding: 15 }} color="secondary">
                    Request History
                  </Typography>
                  {showReport ? <RequestHistory list={onGoings} /> : null}
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
