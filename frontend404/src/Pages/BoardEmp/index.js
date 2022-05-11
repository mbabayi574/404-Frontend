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
  })
);

const BoardEmp = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [showData, setShowData] = React.useState(false);
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
    data.splice(0, data.length)
    axios({
      method: "get",
      url: "http://404g.pythonanywhere.com//BulletinBoard/get_bulletin_board",
      headers: {
        "Content-Type": "application/json",
        Authorization:
        "Bearer " +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3NDM0NTUyLCJqdGkiOiJjYjA5YmE4MWRkOGY0NmU4ODc0NmI3OGM4ZDJkNDIxNyIsInVzZXJfaWQiOjR9.bl8SKbogtnwYn6JuBm298ocOIysFSqVGRseM9sHc_-8",  
      },
    })
      .then(function (response) {
        console.log('inside the succesful response')
        console.log("response: ", response)
        response.data.map((item) => {
          data.push(item);
        })
        setShowData(true);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data)
      });
  };

  return (
    <div className={classes.root}>
    {showData ? (    
      <div>
      {data.map((item) => {
        return (
          <div>
            <h1 className={classes.title}>Announcement:</h1>
          <Card sx={{ backgroundColor: "#e8fdff" }} className={classes.mainCard}>
            <div dangerouslySetInnerHTML={{ __html: item }} />
          </Card>
          </div>
        );
      })}
    </div>) : 
      null}
    </div>
  );
};

export default BoardEmp;
