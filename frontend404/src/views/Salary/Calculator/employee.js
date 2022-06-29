import { Card, Divider, Grid } from "@mui/material";
import "./index.css";
const EmployeeBoard = () => {
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
            width: "50%",
            padding: "10px",
          }}
        >
          <div>
            <h1>Salary Employee</h1>
          </div>

          <div>
            <h3>These are the details of your monthly salary</h3>
          </div>

          <Grid
            container
            spacing={0}
            direction="column"
            // alignItems="center"
            // justifyContent="center"
            padding={"50px"}
          >
            <span>
              Your Salary In This Month :
              <span
                style={{
                  color: "green",
                  fontWeight: "bolder",
                  fontSize: "large",
                }}
              >
                &nbsp; 2350 $
              </span>
              &nbsp;&nbsp;In 130 hr
            </span>
            <div style={{ marginTop: "5px" }}>
              The cost of your health insurance :{" "}
              <span style={{ fontWeight: "bold", color: "red" }}>100 $</span>
            </div>
            <div style={{ marginTop: "5px" }}>
              The cost of your dormitory :{" "}
              <span style={{ fontWeight: "bold", color: "red" }}>300 $</span>
            </div>
            <div style={{ marginTop: "5px" }}>
              The cost of your foods :{" "}
              <span style={{ fontWeight: "bold", color: "red" }}>50 $</span>
            </div>
            <div style={{ marginTop: "5px" }}>
              The cost of your shipping service :{" "}
              <span style={{ fontWeight: "bold", color: "red" }}>100 $</span>
            </div>
            <div
              style={{
                marginTop: "15px",
                fontWeight: "bolder",
                fontSize: "35px",
                color: "green",
              }}
            >
              SUM : 1770 $
            </div>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default EmployeeBoard;
