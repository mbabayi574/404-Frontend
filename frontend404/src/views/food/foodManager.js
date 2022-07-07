import React, { useState } from "react";

import { Box, Container, Grid } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Typography,
  TextField,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Item,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Input,
  // DeleteIcon,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import NewFood from "./components/newFood";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];
const FoodManager = () => {
  // axios.post("http://127.0.0.1:8000/​Food​/post_food", foodData, {
  //   Authorization: "",
  // });
  // const [foodData, setFoodData] = useState({});
  // const handleChange = (e) => {
  //   setFoodData({ ...foodData, [e.target.name]: e.target.value });
  // };
  return (
    <Box
      component="main"
      flexGrow={1}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 2,
          height: "90vh",
        }}
      >
        <Grid
          container
          spacing={2}
          color="03A9F4"
          backgroundColor="primary.secondary"
        >
          <Grid item lg={4} md={6} xs={12}>
            <NewFood />
          </Grid>
          <Grid item lg={8} md={6} xs={12} color="03A9F4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Food's Name</TableCell>
                    <TableCell align="right">Count</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="error"
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          size="large"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FoodManager;
