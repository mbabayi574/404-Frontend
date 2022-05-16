import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import Card from "@mui/material/Card";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
    },
    mainCard: {
      marginRight: 30,
      marginLeft: 30,
      marginBottom: 50,
      marginTop: -10,
      padding: 30,
      overflow: "scroll",
      display: "flex",
      justifyContent: "center",
    },
    title:{
      marginLeft: 30,
      fontFamily: "Helvetica",
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

const TrackerList = (props) => {
  const classes = useStyles();
  const { history } = props;

  return (
    <div className={classes.root}>
        <p className={classes.itemDate}>{props.date}:</p>
        <p>
          from {props.start_point} until {props.end_point}
        </p>
        <p>wasted time: {props.wasted_time}</p>
        <div className={classes.line}></div>
    </div>
  );
};

export default TrackerList;
