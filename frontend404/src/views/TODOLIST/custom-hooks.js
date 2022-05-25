import { useState, useEffect, useContext } from "react";
import { TokenContext } from "App";
import axios from "axios";

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
  const Access_Token = useContext(TokenContext).token;
  const [todos, setTodos] = useState(initialValue);

  const getToDoList = () => {
    var request_data = {};

    var config = {
      method: "get",
      url: "http://404g.pythonanywhere.com/todolist/mytodolist/",
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
      url: "http://404g.pythonanywhere.com/todolist/mytodolist/",
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
      url: "http://404g.pythonanywhere.com/todolist/mytodolist/update/" + id,
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
      url: "http://404g.pythonanywhere.com/todolist/mytodolist/update/" + id,
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

  const [open_checkbox_modal, setOpenCheckBoxModal] = useState(false);

  const handleCloseCheckBoxModal = () => {
    setOpenCheckBoxModal(false);
  };

  const [idx_store, setIdxStore] = useState(null);

  const handleCheckTodo = () => {
    updateToDo(
      todos[idx_store].id,
      todos[idx_store].priority,
      todos[idx_store].description,
      !todos[idx_store].checkbox
    );
    setTodos(
      todos.map((todo, index) => {
        if (idx_store === index) {
          todo.checkbox = !todo.checkbox;
        }
        return todo;
      })
    );
    setOpenCheckBoxModal(false);
  };

  return {
    open_checkbox_modal,
    handleCheckTodo,
    handleCloseCheckBoxModal,
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
      setIdxStore(idx);
      setOpenCheckBoxModal(true);
    },
    removeTodo: (idx) => {
      deleteToDo(todos[idx].id);
      setTodos(todos.filter((_, index) => idx !== index));
    },
  };
};
