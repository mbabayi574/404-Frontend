import * as React from "react";
import Card from "@mui/material/Card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Fragment } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TokenContext } from "App";
import Divider from "@mui/material/Divider";
import {
  Grid,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useAPI from "useAPI";

const DormitoryEmp = (props) => {
  const { token } = React.useContext(TokenContext);
  const api = useAPI();
  const { history } = props;
  const [showData, setShowData] = React.useState(true);
  const [isRoomReserevd, setIsRoomReserevd] = React.useState(false);
  const [selectedForAPI, setSelectedForAPI] = React.useState(null);
  const [reservedRoom, setReservedRoom] = React.useState({
    building: "",
    room: "",
    capacity: "",
    remainingCapacity: "",
  });
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [data, setData] = React.useState([
    {
      building: "centeral",
      room: "18",
      current_capacity: 1,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "centeral",
      room: "11",
      current_capacity: 0,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "western",
      room: "14",
      current_capacity: 5,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "centeral",
      room: "36",
      current_capacity: 3,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "eastern",
      room: "24",
      current_capacity: 6,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "western",
      room: "22",
      current_capacity: 4,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "western",
      room: "2",
      current_capacity: 1,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "eastern",
      room: "10",
      current_capacity: 7,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "centeral",
      room: "36",
      current_capacity: 3,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
    {
      building: "eastern",
      room: "24",
      current_capacity: 6,
      users: [
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
        { token: "fjsdkljfksdjfldsjlfjsdjlj" },
      ],
    },
  ]);

  const columns = [
    {
      field: "building",
      headerName: "Building",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "room",
      headerName: "Room",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "remainingCapacity",
      headerName: "Remaining",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reserve",
      headerName: "RESERVE",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const onCLick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          // return alert(JSON.stringify(thisRow, null, 4));
          handleReserve(thisRow);
        };
        return (
          <Button onClick={onCLick} color="primary" variant="contained">
            Reserve
          </Button>
        );
      },
    },
  ];
  var rows = [];
  data.map((item, index) => {
    if (item.current_capacity !== 0) {
      rows.push({
        id: index,
        building: item.building,
        room: item.room,
        capacity: item.users.length + item.current_capacity,
        remainingCapacity: item.current_capacity,
      });
    }
    // item.users.map((user)=> {
    //   if( user.token === token) {
    //   setReservedRoom(
    //     {
    //       building: item.building,
    //       room: item.room,
    //       capacity: item.users.length + item.current_capacity,
    //       remainingCapacity: item.current_capacity
    //     });
    //   setIsRoomReserevd(true);
    // }
    // })
  });

  React.useEffect(() => {
    console.log("dormitories: ", data);
    // initialize();
    // fillRows();
  }, []);

  const handleYesDialog = () => {
    var requestData = null;
    if (dialogMessage === "Are you sure about reserving this room?") {
      data.map((item) => {
        if (
          selectedForAPI.building === item.building &&
          selectedForAPI.room === item.room
        ) {
          requestData = item;
        }
      });
      console.log("req data: ", requestData);
      api({
        method: "put",
        url: "dormitory/reserveDormitorie",
        headers: {
          "Content-Type": "application/json",
        },
        requestData,
      })
        .then(function (response) {
          console.log("response: ", response);
          setData(response[1]);
          setShowData(true);
          setIsOpenSnackbar(true);
        })
        .catch(function (error) {
          console.log(error);
          console.log(data);
        });
    } else {
      requestData = reservedRoom;
      api({
        method: "delete",
        url: "dormitory/cancelReservation",
        headers: {
          "Content-Type": "application/json",
        },
        requestData,
      });
    }
    setDialogOpen(false);
  };

  const handleNoDialog = () => {
    setSelectedForAPI(null);
    setDialogMessage("");
    setDialogOpen(false);
  };

  const handleReserve = (c) => {
    setSelectedForAPI(c.row);
    setDialogMessage("Are you sure about reserving this room?");
    setDialogOpen(true);
  };

  const onCancel = () => {
    setDialogMessage("Are you sure about canceling your reservation");
    setDialogOpen(true);
  };

  const fillRows = () => {
    rows.splice(0, data.length);
    data.map((item, index) => {
      if (item.current_capacity !== 0) {
        rows.push({
          id: index,
          building: item.building,
          room: item.room,
          capacity: item.users.length + item.current_capacity,
          remaingingCapacity: item.remaingCapacity,
        });
      }
      item.users.map((user) => {
        if (user.token === token) {
          setReservedRoom({
            building: item.building,
            room: item.room,
            capacity: item.users.length + item.current_capacity,
            remainingCapacity: item.current_capacity,
          });
          setIsRoomReserevd(true);
        }
      });
    });
  };

  const initialize = () => {
    data.splice(0, data.length);
    api({
      method: "get",
      url: "dormitory/getDormitories",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("response: ", response);
        setData(response[1]);
        setShowData(true);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });
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
            <Grid container spacing={6} style={{ padding: 32 }}>
              <Grid item sx={4} md={7}>
                <Card>
                  <Typography style={{ padding: 30 }} color="primary">
                    Rooms
                  </Typography>
                  {showData ? (
                    <div
                      style={{
                        height: 530,
                        width: "80%",
                        paddingLeft: 30,
                        paddingRight: 0,
                      }}
                    >
                      <DataGrid rows={rows} columns={columns} pageSize={8} />
                    </div>
                  ) : null}
                </Card>
              </Grid>

              <Grid item sx={4} md={4}>
                <Grid container spacing={0}>
                  <Card style={{ padding: 15 }}>
                    <Typography style={{ padding: 15 }} color="inherit">
                      Your Room:
                    </Typography>
                    <Divider variant="middle" />
                    <Grid
                      item
                      sx={4}
                      md={11}
                      style={{
                        padding: 15,
                        opacity: 1,
                        height: 320,
                        width: 300,
                      }}
                    >
                      <Typography style={{ padding: 15 }} color="inherit">
                        Building: {reservedRoom.building}
                      </Typography>
                      <Typography style={{ padding: 15 }} color="inherit">
                        Room: {reservedRoom.room}
                      </Typography>
                      <Typography style={{ padding: 15 }} color="inherit">
                        Capacity: {reservedRoom.capacity}
                      </Typography>
                      <Typography style={{ padding: 15 }} color="inherit">
                        Remaining Capacity: {reservedRoom.remainingCapacity}
                      </Typography>
                      <Button
                        style={{ marginTop: 30 }}
                        sx={{
                          color: "white",
                          backgroundColor: "red",
                        }}
                        variant="contained"
                        onClick={onCancel}
                      >
                        Cancel Reservation
                      </Button>
                    </Grid>
                    {isRoomReserevd ? null : (
                      <Grid
                        item
                        sx={4}
                        md={12}
                        style={{
                          backgroundColor: "#E8E9EB",
                          padding: 15,
                          opacity: 0.9,
                          marginTop: -320,
                          height: 320,
                          borderRadius: 10,
                        }}
                      >
                        <Typography
                          style={{ padding: 15, paddingTop: 100 }}
                          color="inherit"
                        >
                          Sorry, you havent reserved any rooms yet!
                        </Typography>
                      </Grid>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>

        <Dialog
          open={dialogOpen}
          onClose={handleNoDialog}
          PaperProps={{
            style: {
              position: "relative",
              borderRadius: 12,
            },
          }}
        >
          <DialogContent>{dialogMessage}</DialogContent>
          <DialogActions>
            <Button onClick={handleYesDialog}>Yes</Button>
            <Button onClick={handleNoDialog}>No</Button>
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

export default DormitoryEmp;
