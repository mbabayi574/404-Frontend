import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import axios from "axios";
import Card from "@mui/material/Card";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
    },
    mainCard: {
      margin: 30,
      padding: 30,
      overflow: "scroll",
      display: "flex",
      justifyContent: "center",
    },
  })
);

const BoardEmp = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [data, setData] = React.useState([
    "<h1>Init1</h1>",
    "<h1>Init2</h1>",
    "<h1>Init3</h1>",
    "<h1>Init4</h1>",
    "<h1>Init5</h1>",
  ]);

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    console.log("hello");
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/board",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setData(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      {data.map((item) => {
        return (
          <Card className={classes.mainCard}>
            <div dangerouslySetInnerHTML={{ __html: item }} />
          </Card>
        );
      })}
    </div>
  );
};

export default BoardEmp;
