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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
      width: "100%",
      // backgroundColor: "#aaaa",
      height: "100%",
      bottom: 0,
    },
    mainContainer: {
      margin: 0,
      paddingTop: 15,
      width: "70%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    backContainer: {
      marginTop: 20,
      marginRight: -80,
      marginLeft: -10,
      // "&:hover": {
      //   cursor: "pointer",
      // },
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
      // display: "flex",
      // flexDirection: "column",
    },
    rightBody: {
      // display: "flex",
      // flexDirection: "column",
      margin: 10,
      marginLeft: 50,
      paddingLeft: 50,
      right: 0,
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
    desc: {
      marginBottom: 7,
      margin: 0,
      fontSize: 24,
      fontFamily: "cursive",
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
    },
    horizontalKeeperChange: {
      marginBottom: 20,
      marginTop: -10,
      display: "flex",
      flexDirection: "row",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#24a0ed",
      borderRadius: "24px",
      paddingLeft: 20,
      // paddingRight: 20,
      width: 200,
      "&:hover": {
        cursor: "pointer",
      },
      // width: 300,
    },
    skeleton: {
      height: 500,
      width: 300,
    },
    input: {
      height: "40px",
      width: "70px",
      borderRadius: "10px",
      fontSize: "16px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#24a0ed",
      // #D4D4D4
      // marginTop: "20px",
      outline: "10mm",
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
      height: 20,
      width: "100%",
      borderRadius: 0,
    },
    Button: {
      display: "flex",
      width: "170px",
      // marginLeft: 100,
      backgroundColor: "#24a0ed",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#aaaa",
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
  })
);

const TimeTracker = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [previousDays, setPrevioisDays] = React.useState(false);
  const today = new Date();
  const [EnterHour, setEnterHour] = React.useState(0);
  const [EnterMin, setEnterMin] = React.useState(0);
  const [ExitHour, setExitHour] = React.useState(0);
  const [ExitMin, setExitMin] = React.useState(0);
  const [Wasted, setWasted] = React.useState(0);
  const [PYear, setPYear] = React.useState(0);
  const [PMonth, setPMonth] = React.useState(0);
  const [PDate, setPDate] = React.useState(0);
  const [PEnterHour, setPEnterHour] = React.useState(0);
  const [PEnterMin, setPEnterMin] = React.useState(0);
  const [PExitHour, setPExitHour] = React.useState(0);
  const [PExitMin, setPExitMin] = React.useState(0);
  const [PWasted, setPWasted] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const ApplyHandler = () => {
    if (inputValidatinTime(EnterHour, EnterMin, ExitHour, ExitMin, Wasted)) {
      var startPoint;
      if (EnterHour > 12) {
        startPoint = (EnterHour - 12).toString() + ":" + EnterMin + "PM";
      } else {
        startPoint = EnterHour.toString() + ":" + EnterMin + "AM";
      }

      var endPoint;
      if (ExitHour > 12) {
        endPoint = (ExitHour - 12).toString() + ":" + ExitMin + "PM";
      } else {
        endPoint = ExitHour.toString() + ":" + ExitMin + "AM";
      }

      const request_data = JSON.stringify({
        data:
          today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear(),
        start_point: startPoint,
        end_point: endPoint,
        wasted_time: Wasted.toString(),
      });
      console.log("data is : ", request_data);
      const config = {
        method: "post",
        url: "http://127.0.0.1:8000/auth/jwt/create/",
        headers: {
          "Content-Type": "application/json",
        },
        data: request_data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log("now you can call the apis...");
      setIsOpenSnackbar(true);
    } else {
      setDialogOpen(true);
    }
  };

  const PApplyHandler = () => {
    if (inputValidationDate(PYear, PMonth, PDate)) {
      if (
        inputValidatinTime(PEnterHour, PEnterMin, PExitHour, PExitMin, PWasted)
      ) {
        var startPoint;
        if (PEnterHour > 12) {
          startPoint = (PEnterHour - 12).toString() + ":" + PEnterMin + "PM";
        } else {
          startPoint = PEnterHour.toString() + ":" + PEnterMin + "AM";
        }

        var endPoint;
        if (PExitHour > 12) {
          endPoint = (PExitHour - 12).toString() + ":" + PExitMin + "PM";
        } else {
          endPoint = PExitHour.toString() + ":" + PExitMin + "AM";
        }

        const request_data = JSON.stringify({
          data:
            PMonth.toString() + "/" + PDate.toString() + "/" + PYear.toString(),
          start_point: startPoint,
          end_point: endPoint,
          wasted_time: PWasted.toString(),
        });
        console.log("data is : ", request_data);
        const config = {
          method: "post",
          url: "http://127.0.0.1:8000/auth/jwt/create/",
          headers: {
            "Content-Type": "application/json",
          },
          data: request_data,
        };
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log("now you can call the apis...");
        setIsOpenSnackbar(true);
      } else {
        setDialogOpen(true);
      }
    } else {
      setDialogOpen(true);
    }
  };

  const inputValidationDate = (y, m, d) => {
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

  const inputValidatinTime = (sh, sm, fh, fm, w) => {
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
          <div className={classes.line}></div>
          <p className={classes.desc}>Entering time(h:m):</p>
          <div className={classes.horizontalKeeper}>
            <input
              className={classes.input}
              autoCapitalize="false"
              placeholder="h"
              type="number"
              value={EnterHour}
              onChange={(e) => setEnterHour(e.target.value)}
            />
            <div className={classes.sign}>:</div>
            <input
              className={classes.input}
              autoCapitalize="false"
              placeholder="m"
              type="number"
              value={EnterMin}
              onChange={(e) => setEnterMin(e.target.value)}
            />
          </div>
          <p className={classes.desc}>Exit time(h:m):</p>
          <div className={classes.horizontalKeeper}>
            <input
              className={classes.input}
              autoCapitalize="false"
              placeholder="h"
              type="number"
              value={ExitHour}
              onChange={(e) => setExitHour(e.target.value)}
            />
            <div className={classes.sign}>:</div>
            <input
              className={classes.input}
              autoCapitalize="false"
              placeholder="m"
              type="number"
              value={ExitMin}
              onChange={(e) => setExitMin(e.target.value)}
            />
          </div>
          <p className={classes.desc}>Wasted time(minutes):</p>
          <input
            className={classes.input}
            autoCapitalize="false"
            placeholder="m"
            type="number"
            value={Wasted}
            onChange={(e) => setWasted(e.target.value)}
          />
          <button onClick={() => ApplyHandler()} className={classes.Button}>
            Apply
          </button>
        </div>
        <div className={classes.rightBody}>
          <p className={classes.title}>
            {today.getFullYear()}/{today.getMonth()}/{today.getDate()}
          </p>
          <div className={classes.line}></div>
          <div className={classes.skeleton}>
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
            <Collapse in={previousDays}>
              <div className={classes.skeleton}>
                <p className={classes.desc}>Date(yaer/month/date):</p>
                <div className={classes.horizontalKeeper}>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="year"
                    type="number"
                    value={PYear}
                    onChange={(e) => setPYear(e.target.value)}
                  />
                  <div className={classes.sign}>/</div>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="month"
                    type="number"
                    value={PMonth}
                    onChange={(e) => setPMonth(e.target.value)}
                  />
                  <div className={classes.sign}>/</div>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="day"
                    type="number"
                    value={PDate}
                    onChange={(e) => setPDate(e.target.value)}
                  />
                </div>
                <p className={classes.desc}>Entering time(h:m):</p>
                <div className={classes.horizontalKeeper}>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="h"
                    type="number"
                    value={PEnterHour}
                    onChange={(e) => setPEnterHour(e.target.value)}
                  />
                  <div className={classes.sign}>:</div>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="m"
                    type="number"
                    value={PEnterMin}
                    onChange={(e) => setPEnterMin(e.target.value)}
                  />
                </div>
                <p className={classes.desc}>Exit time(h:m):</p>
                <div className={classes.horizontalKeeper}>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="h"
                    type="number"
                    value={PExitHour}
                    onChange={(e) => setPExitHour(e.target.value)}
                  />
                  <div className={classes.sign}>:</div>
                  <input
                    className={classes.input}
                    autoCapitalize="false"
                    placeholder="m"
                    type="number"
                    value={PExitMin}
                    onChange={(e) => setPExitMin(e.target.value)}
                  />
                </div>
                <p className={classes.desc}>Wasted time(minutes):</p>
                <input
                  className={classes.input}
                  autoCapitalize="false"
                  placeholder="m"
                  type="number"
                  value={PWasted}
                  onChange={(e) => setPWasted(e.target.value)}
                />
                <button
                  onClick={() => PApplyHandler()}
                  className={classes.Button}
                >
                  Apply
                </button>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
