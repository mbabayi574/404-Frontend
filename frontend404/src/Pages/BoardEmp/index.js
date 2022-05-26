import * as React from "react";
import Card from "@mui/material/Card";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Fragment } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography, Paper } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TokenContext } from "App";
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import useAPI from "useAPI";


const BoardEmp = (props) => {
  const api = useAPI();
  const { history } = props;
  const [showData, setShowData] = React.useState(true);
  const [selected, setSelected] = React.useState(false);
  const [selectedAnnouncment, setSelectedAnnouncment] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([{ title: "title one", desc: "<h1>hello</h1>" }, { title: "title two", desc: "<p>desc of p tag</p>" }, { title: "p one", desc: "<p>its a test just in case</p>" }, { title: "image", desc: "<img src={} alt='image alt'/>" }, { title: "another head", desc: "another head in desc" }, { title: "title one", desc: "<h1>hello</h1>" }, { title: "title two", desc: "<p>desc of p tag</p>" }, { title: "p one", desc: "<p>its a test just in case</p>" }, { title: "image", desc: "<img src={} alt='image alt'/>" }, { title: "another head", desc: "another head in desc" }]);
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
  ]


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
    })
  }

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
        setRows(response.data.map((item, index) => ({
          id: index + 1, title: item.title || "No title"
        })));
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
            <Box sx={{ display: 'flex', width: '90%', height: '80vh', justifyContent: 'center', alignItems: 'center', }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={0} style={{ padding: 32, }}>
              <Grid item xs={4} md={16}>
                <Card>
                  <Grid container spacing={15} style={{ padding: 32, }}>
                    <Grid item sx={4} md={4}>
                      <Typography style={{ padding: 15, }} variant="h6">Announcments</Typography>
                      {showData ? (
                        <div style={{ height: 530, width: '100%', paddingLeft: 30, paddingRight: 0, }}>
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
                      {selected ? (<Box sx={{ width: 850, height: 600, backgroundColor: "#fafafa" }}>
                        <Stack spacing={2}>
                          <Typography style={{ padding: 24, fontSize: 20, }} variant="h6">{selectedAnnouncment.title || "No title"}</Typography>
                          <Box sx={{ px: 3, py: 1, width: '100%', height: '100%', overflow: 'auto' }}>
                            <div dangerouslySetInnerHTML={{ __html: selectedAnnouncment.html_fields }} />
                          </Box>
                        </Stack>
                      </Box>) : <Skeleton variant="rectangular" width={850} height={600} />}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Fragment>
    </LocalizationProvider>
  );
};

export default BoardEmp;
