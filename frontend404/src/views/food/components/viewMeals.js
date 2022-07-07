import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const ViewMeals = (props) => {
  const { meals, setSelectedMealId } = props;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const MealRowEditButton = (props) => {
    const { meal } = props;
    return (
      <Tooltip title="edit">
        <IconButton
          onClick={() => setSelectedMealId(meal.id)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    );
  }

  const MealTableRow = (props) => {
    const { meal } = props;
    return (
      <TableRow>
        <TableCell>
          <MealRowEditButton meal={meal} />
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {meal.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1">
            $ {meal.price}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1">
            {capitalizeFirstLetter(meal.day)}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  const MealTable = (props) => {
    const { meals } = props;
    return (
      <TableContainer
        sx={{
          width: "100%",
          maxHeight: "100%"
        }}
      >
        <Table
          stickyHeader
          aria-label="meals-table"
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Day to serve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map(meal => (
              <MealTableRow
                meal={meal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      p: 1
    }}>
      <MealTable meals={meals} />
    </Card>
  );
};

export default ViewMeals;