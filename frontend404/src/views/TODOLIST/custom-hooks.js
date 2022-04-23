import { useState, useEffect } from "react";
import axios from "axios";

const Access_Token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1OTAwMzY1LCJqdGkiOiI3MmVjYzFjNGYyZGM0ZjA3OWJmMGZhNWY5ZGNiZmI0ZSIsInVzZXJfaWQiOjF9.UTdTCjUmWLQ7eRnUMGLrASmFbOKoLllZoSYjE_DYz4Q";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [priorityValue, setPriorityValue] = useState(initialValue);

  return {
    inputValue,
    priorityValue,
    changeInput: (event) => setInputValue(event.target.value),
    changePriority: (event) => setPriorityValue(event.target.value),
    clearInput: () => {
      setInputValue("");
      setPriorityValue("");
    },
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    },
  };
};

export const useTodos = (initialValue = []) => {
  const [todos, setTodos] = useState(initialValue);

  const getToDoList = () => {
    var request_data = {};

    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/todolist/mytodolist/",
      headers: {
        Authorization: "Bearer " + Access_Token,
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    axios(config)
      .then(function (response) {
        setTodos(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  useEffect(() => {
    getToDoList();
  }, []);

  const addToDo = (priority, description, checkbox) => {
    var request_data = {
      priority: priority,
      description: description,
      checkbox: checkbox,
    };

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/todolist/mytodolist/",
      headers: {
        Authorization: "Bearer " + Access_Token,
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const updateToDo = (id, priority, description, checkbox) => {
    var request_data = {
      priority: priority,
      description: description,
      checkbox: checkbox,
    };

    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/todolist/mytodolist/update/" + id,
      headers: {
        Authorization: "Bearer " + Access_Token,
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const deleteToDo = (id) => {
    var request_data = {};

    var config = {
      method: "delete",
      url: "http://127.0.0.1:8000/todolist/mytodolist/update/" + id,
      headers: {
        Authorization: "Bearer " + Access_Token,
        "Content-Type": "application/json",
      },
      data: request_data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return {
    todos,
    addTodo: (description, priority) => {
      if (description !== "" && priority !== "") {
        setTodos(
          todos.concat({
            description,
            checkbox: false,
            priority,
          })
        );
        addToDo(priority, description, false);
      }
    },
    checkTodo: (idx) => {
      updateToDo(
        todos[idx].id,
        todos[idx].priority,
        todos[idx].description,
        !todos[idx].checkbox
      );
      setTodos(
        todos.map((todo, index) => {
          if (idx === index) {
            todo.checkbox = !todo.checkbox;
          }
          return todo;
        })
      );
    },
    removeTodo: (idx) => {
      deleteToDo(todos[idx].id);
      setTodos(todos.filter((_, index) => idx !== index));
    },
  };
};
