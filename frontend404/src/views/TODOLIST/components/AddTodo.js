import React from "react";
import {
  TextField,
  Paper,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AddTodo = React.memo(
  ({
    inputValue,
    priorityValue,
    onInputChange,
    onPriorityChange,
    onInputKeyPress,
    onButtonClick,
  }) => (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={8} md={9} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add ToDo here"
            value={inputValue}
            onChange={onInputChange}
            onKeyPress={onInputKeyPress}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid xs={2} md={2} item>
          <FormControl sx={{ minWidth: "6.5vw" }} size="small">
            <InputLabel id="priority-change-element">Priority</InputLabel>
            <Select
              labelId="priority-change-element"
              id="priority-change-element"
              value={priorityValue}
              label="Priority"
              onChange={onPriorityChange}
            >
              <MenuItem value={1}>
                <b>🔴 1</b>
              </MenuItem>
              <MenuItem value={2}>
                <b>🟡 2</b>
              </MenuItem>
              <MenuItem value={3}>
                <b>🟢 3</b>
              </MenuItem>
              <MenuItem value={4}>
                <b>🔵 4</b>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
);

export default AddTodo;
