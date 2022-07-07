import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NewMeal from "./components/newMeal";
import ViewMeals from "./components/viewMeals";
import UpdateMeal from "./components/updateMeal";

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
  const updateMeal = (values) => {
    let newMeals = meals;
    var foundIndex = newMeals.findIndex(meal => meal.id === values.id);
    newMeals[foundIndex] = values;
    setMeals(newMeals);
  }
  const deleteMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  }

  const selectedMeal = meals.find(meal => meal.id === selectedMealId);

  return (
    <Box
      component="main"
      flexGrow={1}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
        }}
      >
        <Grid
          container
          spacing={3}
          height="100%"
        >
          <Grid
            item
            md={4}
            xs={12}
            container
            spacing={3}
            sx={{
              direction: {
                xs: "row",
                md: "column"
              }
            }}
          >
            <Grid item md={12} sm={6} xs={12}>
              <NewMeal addMeal={addMeal} />
            </Grid>
            <Grid item md={12} sm={6} xs={12}>
              <UpdateMeal
                updateMeal={updateMeal}
                deleteMeal={deleteMeal}
                selectedMeal={selectedMeal}
              />
            </Grid>
          </Grid>
          <Grid item md={8} xs={12}>
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
