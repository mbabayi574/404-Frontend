import "./styles.css";
import React, { Fragment } from "react";
import { useInputValue, useTodos } from "./custom-hooks";
import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Grid, Snackbar, Alert } from "@mui/material";

const TodoApp = React.memo(() => {
  const {
    inputValue,
    priorityValue,
    changeInput,
    changePriority,
    clearInput,
    keyInput,
  } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const clearInputAndAddTodo = () => {
    if (inputValue !== "" && priorityValue !== "") {
      clearInput();
      addTodo(inputValue, priorityValue);
    } else {
      setOpen(true);
    }
  };

  return (
    <Fragment>
      <Layout>
        <Grid container>
          <Grid item xs={6}>
            <AddTodo
              inputValue={inputValue}
              priorityValue={priorityValue}
              onInputChange={changeInput}
              onPriorityChange={changePriority}
              onButtonClick={clearInputAndAddTodo}
              onInputKeyPress={(event) => keyInput(event, clearInputAndAddTodo)}
            />
          </Grid>
          <Grid item xs={6}>
            <TodoList
              items={todos}
              onItemCheck={checkTodo}
              onItemRemove={removeTodo}
            />
          </Grid>
        </Grid>
      </Layout>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please fill text & priority !!!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default TodoApp;
