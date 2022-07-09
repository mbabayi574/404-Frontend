import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";
import ServiceItem, { daysOfWeek } from './components/serviceItem';
import useAPI from "useAPI";
import useUser from "useUser";

const Transportation = () => {
  const [services, setServices] = useState([]);
  const { user } = useUser();
  const api = useAPI();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const loadServices = () => {
    var config = {
      method: "get",
      url: "Transportation/employee/showlists",
      headers: {
        Accept: "application/json",
      },
      params: {
        page: page + 1
      }
    };
    api(config)
      .then((response) => {
        if (response.status == 200) {
          setServices(
            response.data.results
          );
          setCount(response.data.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadServices();
  }, [page]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 2,
          height: "fit-content",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            flexGrow: 1,
            maxWidth: "auto",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Card sx={{ p: 1, width: "100%", height: "100%" }}>
            <TableContainer sx={{ width: "100%", maxHeight: "780px" }}>
              <Table stickyHeader aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {
                        user?.role === "C" && (
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/my/transportation/add")}
                          >
                            Add Service
                          </Button>
                        )
                      }
                    </TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell align="center">Arrival Time</TableCell>
                    <TableCell align="center">Return Time</TableCell>
                    <TableCell align="center" colSpan={7}>Days</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    {daysOfWeek.map((day) => (
                      <TableCell size="small" align="center">{day}</TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service) => (
                    <ServiceItem
                      service={service}
                      loadServices={loadServices}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};
export default Transportation;