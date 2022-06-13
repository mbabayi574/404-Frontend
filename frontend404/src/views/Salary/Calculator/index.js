import React from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./index.css";
const Board = () => {
  const employees = ["Golikani", "Babayi", "Geramimehr"];

  const [employee, setEmployee] = React.useState(null);

  const handleChangeEmployee = (event) => {
    setEmployee(event.target.value);
  };

  const [monthly_salary, setMonthlySalary] = React.useState(2000);

  const handleChangeMonthlySalary = (event) => {
    setMonthlySalary(event.target.value);
  };

  const [rewards_and_benefits, setRANDB] = React.useState(400);

  const handleChangeRANDB = (event) => {
    setRANDB(event.target.value);
  };

  const [minimum_working_hour, setMinimumWorkingHour] = React.useState(180);

  const handleChangeMinimumWorkingHour = (event) => {
    setMinimumWorkingHour(event.target.value);
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <Card
          style={{
            backgroundColor: "skyblue",
            width: "50%",
            padding: "10px",
          }}
        >
          <div>
            <h1>Salary Employeer</h1>
          </div>

          <div>
            <h3>Please fill in any of the boxes below</h3>
          </div>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding={"50px"}
          >
            <TextField
              select
              label="Name Of Employee"
              value={employee}
              onChange={handleChangeEmployee}
              helperText="Please select your employee"
              inputProps={{ style: { fontFamily: "nunito", color: "black" } }}
              fullWidth
            >
              {employees.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Monthly Salary"
              fullWidth
              style={{ marginTop: "8px" }}
              type={"number"}
              value={monthly_salary}
              onChange={handleChangeMonthlySalary}
            />
            <TextField
              label="Rewards and Benefits"
              fullWidth
              style={{ marginTop: "10px" }}
              type={"number"}
              value={rewards_and_benefits}
              onChange={handleChangeRANDB}
            />

            <TextField
              label="Minimum Working Hours"
              fullWidth
              style={{ marginTop: "10px" }}
              type={"number"}
              value={minimum_working_hour}
              onChange={handleChangeMinimumWorkingHour}
            />

            <Grid container spacing={0.5}>
              <Grid item xs={4}>
                <p style={{ marginTop: "15px" }}>Salary by the hour :</p>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  fullWidth
                  style={{ marginTop: "10px" }}
                  disabled
                  value={
                    (monthly_salary + rewards_and_benefits) /
                    minimum_working_hour
                  }
                />
              </Grid>
            </Grid>

            <Button style={{ marginTop: "15px" }} variant="contained">
              Submit
            </Button>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default Board;
