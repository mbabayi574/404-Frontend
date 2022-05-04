import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import arrow from "../../assets/image/arrowDown.png";
import arrowUp from "../../assets/image/arrowUp.png";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import back from "../../assets/image/back.png";
import MuiAlert from "@mui/material/Alert";
import DateMomentUtils from "@date-io/moment";
import Card from "@mui/material/Card";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 10,
      width: "100%",
      // backgroundColor: "#aaaa",
      height: "100%",
      bottom: 0,
    },
    mainContainer: {
      margin: 0,
      paddingTop: 15,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    backContainer: {
      marginTop: 20,
      marginRight: 0,
      marginLeft: -10,
      // "&:hover": {
      //   cursor: "pointer",
      // },
    },
    card: {
      padding: 20,
      width: "100%",
      backgroundColor: "#FAEBD7",
    },
    back: {
      padding: 2,
      width: 20,
      "&:hover": {
        cursor: "pointer",
      },
      "&:active": {
        cursor: "pointer",
        transform: "translateY(1px)",
      },
    },
    leftBody: {
      margin: 10,
      width: "100%",
      // display: "flex",
      // flexDirection: "column",
    },
    rightBody: {
      // overflow: "scroll",
      // display: "flex",
      // flexDirection: "column",
      backgroundColor: "#FAEBD7",
      margin: 10,
      marginTop: 50,
      marginLeft: 50,
      paddingLeft: 20,
      paddingTop: 20,
      right: 0,
      width: "25%",
      height: 600,
      alignItems: "center",
      alignContent: "center",
    },
    title: {
      margin: 0,
      marginBottom: 50,
      fontSize: 36,
      fontWeight: "bold",
      fontFamily: "Helvetica",
    },
    date: {
      margin: 0,
      marginBottom: 20,
      fontSize: 26,
      fontWeight: "bold",
      fontFamily: "Helvetica",
    },
    desc: {
      marginBottom: 4,
      margin: 5,
      fontSize: 18,
      fontFamily: "Helvetica",
    },
    picker: {
      width: 80,
    },
    Dpicker: {
      width: 100,
      paddingLeft: 20,
      textAlign: "cneter",
    },
    sign: {
      fontSize: 36,
      marginLeft: 3,
      marginRight: 3,
      fontWeight: "bold",
    },
    horizontalKeeper: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "row",
      // justifyContent: "left",
    },
    HKeeper: {
      // marginBottom: 15,
      display: "flex",
      flexDirection: "row",
      marginRight: 50,
    },
    HKeeperDate: {
      marginBottom: 25,
      display: "flex",
      flexDirection: "row",
      marginRight: 50,
    },
    horizontalKeeperChange: {
      marginBottom: 10,
      marginTop: 15,
      paddingBottom: 5,
      display: "flex",
      flexDirection: "row",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#24a0ed",
      borderRadius: "4px",
      paddingLeft: 20,
      // paddingRight: 20,
      width: 160,
      "&:hover": {
        cursor: "pointer",
      },
      // width: 300,
    },
    skeleton: {
      height: 300,
      // width: 600,
    },
    input: {
      height: "20px",
      width: "40px",
      // borderRadius: "4px",
      fontSize: "16px",
      // borderWidth: 1,
      // borderStyle: "solid",
      // borderColor: "#24a0ed",
      // #D4D4D4
      // marginTop: "20px",
      marginBottom: 5,
      // outline: "10mm",
      color: "#4a546b",
      // padding: "21px 30px",
      textAlign: "center",
    },
    arrow: {
      marginTop: 11,
      marginRight: 2,
      width: 15,
      height: 15,
    },
    arrowUp: {
      marginTop: 10,
      marginRight: 4,
      width: 15,
      height: 15,
    },
    dialogText: {
      fontSize: 15,
      paddingTop: "0px",
      fontFamily: "Helvetica",
      color: "#4A546B",
      textAlign: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#aaaa",
      borderBottomStyle: "solid",
    },
    dialogButton: {
      fontSize: 15,
      fontFamily: "Helvetica",
      color: "#4A546B",
      height: 27,
      width: "100%",
      borderRadius: 0,
    },
    Button: {
      display: "flex",
      width: "110px",
      // marginLeft: 100,
      color: "#ffffff",
      backgroundColor: "#24a0ed",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#ffff",
      borderRadius: "10px",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: "15px",
      cursor: "pointer",
      marginTop: "20px",
      height: "43px",
      outline: "10mm",
      fontWeight: "bold",
      "&:active": {
        cursor: "pointer",
        // backgroundColor: "#aaaa",
        boxShadow: "2px 2px #aaaa",
        transform: "translateY(1px)",
      },
    },
    line: {
      margin: 0,
      width: 300,
      borderTopWidth: 2,
      borderTopStyle: "solid",
      borderTopColor: "#24a0ed",
      height: 1,
      marginBottom: 50,
      marginTop: -40,
    },
    snackBar: {
      marginBottom: "80px",
      marginLeft: 100,
    },
    select: {
      height: 30,
      // borderWidth: 1,
      // borderStyle: "solid",
      // borderColor: "#24a0ed",
      // borderRadius: "4px",
    },
    list: {
      margin: 0,
      height: "90%",
      overflowY: "auto",
      borderTopStyle: "solid",
      borderTopWidth: 1,
      borderTopColor: "#aaaa",
    },
    listItem: {
      marginLeft: 5,
    },
    itemDate: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Helvetica",
    },
    line: {
      borderTopWidth: 1,
      borderTopColor: "#aaaa",
      borderTopStyle: "solid",
      // width: "%10",
      marginRight: 30,
      marginLeft: 5,
    },
  })
);

const TimeTracker = (props) => {
  const theme = useTheme();
  var list = [
    { date: "2022/5/4", start: "13:30", end: "15:00", wasted: 15 },
    { date: "2022/8/4", start: "9:10", end: "17:00", wasted: 0 },
    { date: "2022/18/4", start: "12:45", end: "21:05", wasted: 120 },
    { date: "2022/5/4", start: "13:30", end: "15:00", wasted: 15 },
    { date: "2022/8/4", start: "9:10", end: "17:00", wasted: 0 },
    { date: "2022/18/4", start: "12:45", end: "21:05", wasted: 120 },
    { date: "2022/5/4", start: "13:30", end: "15:00", wasted: 15 },
    { date: "2022/8/4", start: "9:10", end: "17:00", wasted: 0 },
    { date: "2022/18/4", start: "12:45", end: "21:05", wasted: 120 },
    { date: "2022/5/4", start: "13:30", end: "15:00", wasted: 15 },
    { date: "2022/8/4", start: "9:10", end: "17:00", wasted: 0 },
    { date: "2022/18/4", start: "12:45", end: "21:05", wasted: 120 },
  ];
  const { history } = props;
  const minute = [];
  for (var i = 0; i <= 120; i += 5) minute.push(i);
  const classes = useStyles();
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

  React.useEffect(() => {
    getReportList();
  }, []);

  const getReportList = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/tracker/get/me/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        list = response.data[1];
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage("cannot get the report");
        setDialogOpen(true);
      });
  };

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
        url: "http://127.0.0.1:8000/tracker/me/",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2MDU4MjYyLCJqdGkiOiI4NDk2MTU3MWVhNTA0YzViYmFlNGMxOWRmZTJkZDdmMiIsInVzZXJfaWQiOjF9.M0M_zo7VOPZQVTNU8CWw0ts6uMsbNpsWT0TkCsXE1PM",
        },
        data: request_data,
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          setIsOpenSnackbar(true);
        })
        .catch(function (error) {
          console.log(error);
          setErrorMessage("Request failed");
          setDialogOpen(true);
          getReportList();
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
          url: "http://127.0.0.1:8000/tracker/update/me/",
          headers: {
            "Content-Type": "application/json",
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
    const sh = enter.getHours();
    const sm = enter.getMinutes();
    const fh = exit.getHours();
    const fm = exit.getMinutes();
    const w = Number(wasted);
    if (sh === 0 || fh === 0) {
      setErrorMessage("You should first fill out the inputs");
      return false;
    }
    if (sh < 0 || sm < 0 || fh < 0 || fm < 0 || w < 0) {
      setErrorMessage("Numbers should be positive!");
      return false;
    }
    if (sh > 24 || fh > 24) {
      setErrorMessage("Your time Hour should be between 1 and 24");
      return false;
    }
    if (sm > 60 || fm > 60) {
      setErrorMessage("Your time Minute should be between 1 and 60 ");
    }
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
    <div className={classes.root}>
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
        <DialogContent className={classes.dialogText}>
          {errorMessage}
        </DialogContent>
        <DialogActions>
          <Button className={classes.dialogButton} onClick={handleCloseDialog}>
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
        className={classes.snackBar}
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
      <MuiPickersUtilsProvider utils={DateMomentUtils}>
        <div className={classes.mainContainer}>
          <div className={classes.backContainer}>
            <img
              onClick={() => history.push("./home")}
              src={back}
              alt="back"
              className={classes.back}
            />
          </div>
          <div className={classes.leftBody}>
            <p className={classes.title}>Time Tracker</p>
            <Card className={classes.card} sx={{ backgroundColor: "#e8fdff" }}>
              <p className={classes.date}>
                {today.getFullYear()}/{today.getMonth() + 1}/{today.getDate()}
                (today)
              </p>
              <div className={classes.horizontalKeeper}>
                <div className={classes.HKeeper}>
                  <p className={classes.desc}>Entering time:</p>
                  <TimePicker
                    className={classes.picker}
                    value={enterTime}
                    onChange={setEnterTime}
                  />
                </div>
                <div className={classes.HKeeper}>
                  <p className={classes.desc}>Exit time: </p>
                  <TimePicker
                    className={classes.picker}
                    value={exitTime}
                    onChange={setExitTime}
                  />
                </div>
                <div className={classes.HKeeper}>
                  <p className={classes.desc}>Wasted time:</p>
                  <FormControl sx={{ marginTop: 0, width: 80, height: 30 }}>
                    <InputLabel>Min</InputLabel>
                    <Select
                      className={classes.select}
                      // labelId="demo-multiple-name-label"
                      // id="demo-multiple-name"
                      value={wastedTime}
                      onChange={(e) => setWastedTime(e.target.value)}
                      input={<OutlinedInput label="Mins" />}
                      MenuProps={MenuProps}
                    >
                      {minute.map((min) => (
                        <MenuItem
                          // key={min}
                          value={min}
                          // style={getStyles(name, wastedTime, theme)}
                        >
                          {min}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <button onClick={() => ApplyHandler()} className={classes.Button}>
                Apply
              </button>
            </Card>
            <div
              className={classes.horizontalKeeperChange}
              onClick={() => setPrevioisDays(!previousDays)}
            >
              <img
                className={previousDays ? classes.arrow : classes.arrowUp}
                src={previousDays ? arrowUp : arrow}
                alt="arrow"
              />
              <p className={classes.desc}>previous days</p>
            </div>
            <div className={classes.skeleton}>
              <Collapse in={previousDays} sx={{ width: "100%" }}>
                <Card
                  className={classes.card}
                  sx={{ backgroundColor: "#e8fdff" }}
                >
                  <div className={classes.HKeeper}>
                    <div className={classes.HKeeperDate}>
                      <p className={classes.desc}>Date:</p>
                      <DatePicker
                        className={classes.Dpicker}
                        value={pdate}
                        onChange={setpdate}
                      />
                    </div>
                    <div className={classes.HKeeperDate}>
                      <p className={classes.desc}>ID:</p>
                      <input
                        className={classes.input}
                        autoCapitalize="false"
                        placeholder="m"
                        type="number"
                        value={PId}
                        onChange={(e) => setPId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={classes.horizontalKeeper}>
                    <div className={classes.HKeeper}>
                      <p className={classes.desc}>Entering time:</p>
                      <TimePicker
                        className={classes.picker}
                        value={penterTime}
                        onChange={setpenterTime}
                      />
                    </div>
                    <div className={classes.HKeeper}>
                      <p className={classes.desc}>Exit time: </p>
                      <TimePicker
                        className={classes.picker}
                        value={pexitTime}
                        onChange={setpexitTime}
                      />
                    </div>
                    <div className={classes.HKeeper}>
                      <p className={classes.desc}>Wasted time:</p>
                      <FormControl sx={{ marginTop: 0, width: 80, height: 30 }}>
                        <InputLabel>Min</InputLabel>
                        <Select
                          className={classes.select}
                          // labelId="demo-multiple-name-label"
                          // id="demo-multiple-name"
                          value={pwastedTime}
                          onChange={(e) => setpWastedTime(e.target.value)}
                          input={<OutlinedInput label="Mins" />}
                          MenuProps={MenuProps}
                        >
                          {minute.map((min) => (
                            <MenuItem
                              // key={min}
                              value={min}
                              // style={getStyles(name, wastedTime, theme)}
                            >
                              {min}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <button
                    onClick={() => PApplyHandler()}
                    className={classes.Button}
                  >
                    Apply
                  </button>
                </Card>
              </Collapse>
            </div>
          </div>
          <Card
            className={classes.rightBody}
            sx={{ backgroundColor: "#e8fdff" }}
          >
            <p className={classes.date}>Report:</p>
            <div className={classes.list}>
              {list.map((item) => {
                return (
                  <div className={classes.listItem}>
                    <p className={classes.itemDate}>{item.date}:</p>
                    <p>
                      from {item.start} until {item.end}
                    </p>
                    <p></p>
                    <p>wasted time: {item.wasted}</p>
                    <div className={classes.line}></div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default TimeTracker;
