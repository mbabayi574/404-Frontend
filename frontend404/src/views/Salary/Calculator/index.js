import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./index.css";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pay: 0,
      hourlyPay: 0,
      weeklyPay: 0,
      monthlyPay: 0,
      yearlyPay: 0,
      rent: 0,
      transportation: 0,
    };

    this.changeHourly = this.changeHourly.bind(this);
    this.changeWeekly = this.changeWeekly.bind(this);
    this.changeMonthly = this.changeMonthly.bind(this);
    this.changeYearly = this.changeYearly.bind(this);
  }
  changeHourly(event) {
    this.setState({
      hourlyPay: event.target.value,
      weeklyPay: event.target.value * 40,
      monthlyPay: event.target.value * 160,
      yearlyPay: event.target.value * 2080,
      rent: Math.round((100 * event.target.value * 160) / 3) / 100,
      transportation: Math.round(100 * event.target.value * 16) / 100,
    });
  }
  changeWeekly(event) {
    this.setState({
      hourlyPay: event.target.value / 40,
      weeklyPay: event.target.value,
      monthlyPay: event.target.value * 4,
      yearlyPay: event.target.value * 52,
      rent: (event.target.value * 4) / 3,
    });
  }
  changeMonthly(event) {
    this.setState({
      hourlyPay: Math.round((100 * event.target.value) / 160) / 100,
      weeklyPay: Math.round((100 * event.target.value) / 4) / 100,
      monthlyPay: event.target.value,
      yearlyPay: Math.round(100 * event.target.value * 12) / 100,
      rent: Math.round((100 * event.target.value) / 3) / 100,
    });
  }
  changeYearly(event) {
    this.setState({
      hourlyPay: Math.round((100 * event.target.value) / 2080) / 100,
      weeklyPay: Math.round((100 * event.target.value) / 52) / 100,
      monthlyPay: Math.round((100 * event.target.value) / 12) / 100,
      yearlyPay: Math.round(100 * event.target.value) / 100,
      rent: Math.round((100 * event.target.value) / 36) / 100,
      transportation: Math.round((100 * event.target.value) / 108) / 100,
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="header">
          <h1>Salary Calculator</h1>
        </div>
        <div className="information">
          <div className="row">
            <h3>Please fill in any of the boxes below</h3>
          </div>
          <div className="row">
            <h3>
              Hourly Pay :{" "}
              <TextField
                value={this.state.hourlyPay}
                onChange={this.changeHourly}
                size="small"
                variant="outlined"
                style={{ height: "16px" }}
                inputProps={{
                  style: {
                    height: "16px",
                  },
                }}
              />
            </h3>
          </div>
          <div className="row">
            <h3>
              Weekly Pay :{" "}
              <TextField
                value={this.state.weeklyPay}
                onChange={this.changeWeekly}
                size="small"
                variant="outlined"
                style={{ height: "16px" }}
                inputProps={{
                  style: {
                    height: "16px",
                  },
                }}
              />
            </h3>
          </div>
          <div className="row">
            <h3>
              Monthly Pay :{" "}
              <TextField
                value={this.state.monthlyPay}
                onChange={this.changeMonthly}
                size="small"
                variant="outlined"
                style={{ height: "16px" }}
                inputProps={{
                  style: {
                    height: "16px",
                  },
                }}
              />
            </h3>
          </div>
          <div className="row">
            <h3>
              Yearly&nbsp; Pay&nbsp;:{" "}
              <TextField
                value={this.state.yearlyPay}
                onChange={this.changeYearly}
                size="small"
                variant="outlined"
                style={{ height: "16px" }}
                inputProps={{
                  style: {
                    height: "16px",
                  },
                }}
              />
            </h3>
          </div>
          <div className="row">
            <h3> </h3>
          </div>
          <div className="header">
            <h2>Monthly Expenses</h2>
          </div>
          <div className="row">
            <h3>Rent</h3>
            <h3>$ {this.state.rent}</h3>
          </div>
          <div className="row">
            <h3>Transportation</h3>
            <h3>$ {this.state.transportation}</h3>
          </div>
          <div className="row">
            <h3>Food & Snacks </h3>
            <h3>$ {this.state.transportation}</h3>
          </div>
          <div className="header">
            <h2>SUM</h2>
          </div>
          <div className="row">
            <h3>Final rights </h3>
            <h3>
              ${" "}
              {this.state.monthlyPay -
                (this.state.rent + this.state.transportation * 2)}
            </h3>
          </div>
          <div className="row">
            <Grid container xs={12}>
              <h3>Employee : &nbsp;</h3>
              <FormControl style={{ minWidth: "30vw" }}>
                <InputLabel>Employee</InputLabel>
                <Select input={<OutlinedInput label="Employee" />}>
                  <MenuItem value={"1"}>{"Mohammad Ebrahimi"}</MenuItem>
                  <MenuItem value={"2"}>{"Reza Babayi"}</MenuItem>
                  <MenuItem value={"3"}>{"Hosein Jalali"}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </div>
          <div className="row">
            <h3> </h3>
          </div>
          <div className="row">
            <h3> </h3>
          </div>
          <Button variant="contained" fullWidth>
            Submit
          </Button>
          <div className="row">
            <h3> </h3>
          </div>{" "}
          <div className="row">
            <h3> </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
