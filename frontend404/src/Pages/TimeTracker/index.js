import * as React from "react";
import {Fragment} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography, Paper } from "@mui/material";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Card from "@mui/material/Card";
import { DesktopDatePicker as DatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TokenContext } from 'App';
import ReportTracker from './report';
import {
  Grid,
  Snackbar,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};


const TimeTracker = (props) => {
  const {token, } = React.useContext(TokenContext);
  const [list ,setList] = React.useState([]);
  const minute = [];
  for (var i = 0; i <= 120; i += 5) minute.push(i);
  const [previousDays, setPrevioisDays] = React.useState(false);
  const today = new Date();
  const [enterTime, setEnterTime] = React.useState(new Date());
  const [exitTime, setExitTime] = React.useState(new Date());
  const [PId, setPId] = React.useState(0);
  const [wastedTime, setWastedTime] = React.useState(0);
  const [pdate, setpdate] = React.useState(new Date());
  const [penterTime, setpenterTime] = React.useState(new Date());
  const [pexitTime, setpexitTime] = React.useState(new Date());
  const [pwastedTime, setpWastedTime] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showReport, setShowReport] = React.useState(false);

  const getReportList = () => {
    list.splice(0, list.length);
    axios({
      method: "get",
      url: "http://404g.pythonanywhere.com/tracker/me/",
      headers: {
        "Content-Type": "application/json",
        Authorization:
        "Bearer " + token,  
      },
    })
      .then(function (response) {
        const arr = [];
        response.data.map((item) => {
          arr.push(item)
        })
        setList(arr);
        setShowReport(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage("cannot get the report");
        setDialogOpen(true);
      });
  };

  React.useEffect(() =>{
    getReportList();
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const ApplyHandler = () => {
    if (
      inputValidatinTime(new Date(enterTime), new Date(exitTime), wastedTime)
    ) {
      const month = today.getMonth() + 1;
      var request_data = JSON.stringify({
        date: today.getFullYear() + "-" + month + "-" + today.getDate(),
        start_point:
          new Date(enterTime).getHours() +
          ":" +
          new Date(enterTime).getMinutes(),
        end_point:
          new Date(exitTime).getHours() + ":" + new Date(exitTime).getMinutes(),
        wasted_time: wastedTime,
      });
      console.log("request data is : ", request_data);
      const config = {
        method: "post",
        url: "http://404g.pythonanywhere.com/tracker/me/",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + token,
        },
        data: request_data,
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          getReportList();
          setIsOpenSnackbar(true);

        })
        .catch(function (error) {
          console.log(error);
          setErrorMessage("Request failed");
          setDialogOpen(true);
          // getReportList();
        });
    } else {
      setDialogOpen(true);
    }
  };

  const PApplyHandler = () => {
    if (inputValidationDate(new Date(pdate))) {
      if (
        inputValidatinTime(
          new Date(penterTime),
          new Date(pexitTime),
          pwastedTime
        )
      ) {
        var request_data = JSON.stringify({
          id: PId,
          date:
            new Date(pdate).getFullYear() +
            "-" +
            new Date(pdate).getMonth() +
            "-" +
            new Date(pdate).getDate(),
          start_point:
            new Date(penterTime).getHours() +
            ":" +
            new Date(penterTime).getMinutes(),
          end_point:
            new Date(pexitTime).getHours() +
            ":" +
            new Date(pexitTime).getMinutes(),
          wasted_time: pwastedTime,
        });
        console.log("data is : ", request_data);
        const config = {
          method: "put",
          url: "http://404g.pythonanywhere.com/tracker/update/me/",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer " + token,  
          },
          data: request_data,
        };
        axios(config)
          .then(function (response) {
            console.log(response.data);
            setIsOpenSnackbar(true);
            getReportList();
          })
          .catch(function (error) {
            setErrorMessage("Request failed");
            console.log(error);
            setDialogOpen(true);
          });
      } else {
        setDialogOpen(true);
      }
    } else {
      setDialogOpen(true);
    }
  };

  const inputValidationDate = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    // if (PId <= 0) {
    //   setErrorMessage("ID should be a positive number");
    //   return false;
    // }
    if (y < 0 || m < 0 || d < 0) {
      setErrorMessage("numbers should be positive");
      return false;
    }
    if (y === 0 || m === 0 || d === 0) {
      setErrorMessage("you should first fill out the inputs");
      return false;
    }
    if (y < 2010) {
      setErrorMessage("you cant modify the days before 2010");
      return false;
    }
    if (m > 12) {
      setErrorMessage("month number should be between 1 and 12");
      return false;
    }
    if (m === 1 && d > 31) {
      setErrorMessage("January has 31 days!");
      return false;
    }
    if (m === 2 && d > 28) {
      setErrorMessage("February has 28 days!");
      return false;
    }
    if (m === 3 && d > 31) {
      setErrorMessage("March has 31 days!");
      return false;
    }
    if (m === 4 && d > 30) {
      setErrorMessage("April has 30 days!");
      return false;
    }
    if (m === 5 && d > 31) {
      setErrorMessage("May has 31 days!");
      return false;
    }
    if (m === 6 && d > 30) {
      setErrorMessage("June has 30 days!");
      return false;
    }
    if (m === 7 && d > 31) {
      setErrorMessage("July has 31 days!");
      return false;
    }
    if (m === 8 && d > 31) {
      setErrorMessage("August has 31 days!");
      return false;
    }
    if (m === 9 && d > 30) {
      setErrorMessage("September has 30 days!");
      return false;
    }
    if (m === 10 && d > 31) {
      setErrorMessage("October has 31 days!");
      return false;
    }
    if (m === 11 && d > 30) {
      setErrorMessage("November has 30 days!");
      return false;
    }
    if (m === 12 && d > 31) {
      setErrorMessage("December has 31 days!");
      return false;
    }
    if (y > today.getFullYear()) {
      setErrorMessage(
        "You cant change the future from here, you have to live it!"
      );
      return false;
    }
    if (y === today.getFullYear() && m > today.getMonth()) {
      setErrorMessage(
        "You cant change the future from here, you have to live it!"
      );
      return false;
    }
    if (
      y === today.getFullYear() &&
      m === today.getMonth() &&
      d > today.getDate()
    ) {
      setErrorMessage(
        "You cant change the future from here, you have to live it!"
      );
      return false;
    }
    return true;
  };

  const inputValidatinTime = (enter, exit, wasted) => {
    console.log('enter: ', enter);
    console.log('exit:', exit);
    console.log('wasted:', wasted);
    const sh = enter.getHours();
    const sm = enter.getMinutes();
    const fh = exit.getHours();
    const fm = exit.getMinutes();
    const w = Number(wasted);
    if (sh > fh) {
      setErrorMessage("Exit time should be after Enter time");
      return false;
    }
    if (sh === fh && sm >= fm) {
      setErrorMessage("Exit time should be after Enter time");
      return false;
    }
    const duration = (fh - sh) * 60 + (fm - sm);
    if (duration < w) {
      setErrorMessage(
        "Your work duration should be longer than the wasted time"
      );
      return false;
    }

    return true;
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setErrorMessage("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Fragment>
      <Paper
        elevation={0}
        style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
      >
        <AppBar color="primary" position="static"     style={{ height: 64 }}>
          <Toolbar style={{ height: 64, justifyContent: "space-between", }}>
            <Typography color="inherit">Time Tracker</Typography>
            <Typography color="inherit">{today.getFullYear()}/{today.getMonth() + 1}/{today.getDate()} (today)</Typography>
          </Toolbar>
        </AppBar>
        {isLoading ? (
           <Box sx={{ display: 'flex' , width: '90%', height: '80vh', justifyContent: 'center',alignItems: 'center', }}>
             <CircularProgress />
           </Box>
        ):(
          <Grid container spacing={0} style={{ padding: 32,}}>
          <Grid item xs={4} md={4} style={{ padding: 0, marginRight: 30,}}>
              <Card>
                <Grid container spacing={2} style={{ margin: 1,}}>
                  <Grid item xs={4} md={4} style={{ margin: 5,}}>
                  <Typography style={{ padding: 5,}} color="primary">Enter Time</Typography>
                    <TimePicker
                      value={enterTime}
                      onChange={setEnterTime}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={4} md={4} style={{ margin: 5,}}>
                  <Typography style={{ padding: 5,}} color="primary">Exit Time</Typography>
                    <TimePicker
                      value={exitTime}
                      onChange={setExitTime}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item style={{ margin: 5,}}>
                  <Typography style={{ padding: 5,}} color="primary">Wasted Time</Typography>
                    <FormControl sx={{ marginTop: 0, width: 80, }}>
                      <InputLabel>Min</InputLabel>
                      <Select
                        value={wastedTime}
                        onChange={(e) => setWastedTime(e.target.value)}
                        input={<OutlinedInput label="Mins" />}
                        MenuProps={MenuProps}
                      >
                        {minute.map((min) => (
                          <MenuItem
                            value={min}
                          >
                            {min}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid >
                </Grid>
                <Button
                style={{ margin: 20,}}
                color="primary"
                variant="outlined" 
                onClick={() => ApplyHandler()} >
                  Apply
                </Button>
              </Card>
              <Button 
              style={{ marginTop: 20, marginBottom: 20,}}
                color="primary"
                variant="outlined"  
                onClick={() => setPrevioisDays(!previousDays)}>
                  Previous Days
              </Button>
              <Card >
                <Collapse in={previousDays} sx={{ width: "100%" }}>
                  <Card
                  >
                    <Grid container spacing={2} style={{ margin: 1,}}>
                      <Grid item xs={4} md={4} style={{ margin: 5,}}>
                      <Typography style={{ padding: 5,}} color="primary">Date</Typography>
                        <DatePicker
                          value={pdate}
                          onChange={setpdate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} style={{ margin: 5,}} >
                      <Typography style={{ padding: 5,}} color="primary">ID</Typography>
                        <TextField
                          id="standard-number"
                          label="Number"
                          type="number"
                          value={PId}
                          onChange={(e) => setPId(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ margin: 1,}}>
                      <Grid item xs={4} md={4} style={{ margin: 5,}} >
                      <Typography style={{ padding: 5,}} color="primary">Enter Time</Typography>
                        <TimePicker
                          value={penterTime}
                          onChange={setpenterTime}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} style={{ margin: 5,}} >
                      <Typography style={{ padding: 5,}} color="primary">Exit Time</Typography>
                        <TimePicker
                          value={pexitTime}
                          onChange={setpexitTime}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Grid>
                      <Grid item style={{ margin: 5,}} >
                      <Typography style={{ padding: 5,}} color="primary">Wasted Time</Typography>
                        <FormControl sx={{ marginTop: 0, width: 80, height: 30 }}>
                          <InputLabel>Min</InputLabel>
                          <Select
                            value={pwastedTime}
                            onChange={(e) => setpWastedTime(e.target.value)}
                            input={<OutlinedInput label="Mins" />}
                            MenuProps={MenuProps}
                          >
                            {minute.map((min) => (
                              <MenuItem
                                value={min}
                              >
                                {min}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      style={{ margin: 20,}}
                      color="primary"
                      variant="outlined" 
                      onClick={() => PApplyHandler()}
                    >
                      Apply
                    </Button>
                  </Card>
                </Collapse>
              </Card>
              </Grid>
              <Grid item xs={4} md={5}>
            <Card>
            <Typography style={{ padding: 15,}} color="secondary">Report Tracker</Typography>
              {showReport?(<ReportTracker list={list} />) : null}
              {/* <ReportTracker list={list} /> */}
            </Card>
            </Grid>
          </Grid>
        ) }
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
          <DialogContent>
            {errorMessage}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              OK
            </Button>
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

export default TimeTracker;
