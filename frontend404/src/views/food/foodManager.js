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
import ViewMeals from "./components/viewMeals";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];
const FoodManager = () => {
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [meals, setMeals] = useState([]);

  const addMeal = (values) => {
    const meal = {
      ...values,
      id: Math.floor(Math.random() * 100000),
    };
    setMeals([...meals, meal]);
  };
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
          spacing={3}
        >
          <Grid item lg={4} md={6} xs={12}>
            <NewFood addFood={addMeal} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ViewMeals
              meals={meals}
              setSelectedMealId={setSelectedMealId}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FoodManager;
