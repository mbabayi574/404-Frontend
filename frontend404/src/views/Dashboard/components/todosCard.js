import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import useAPI from "useAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardTodosCard = () => {
  const navigate = useNavigate();
  const api = useAPI();
  const [count, setCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [mediumPriorityCount, setMediumPriorityCount] = useState(0);
  const [lowPriorityCount, setLowPriorityCount] = useState(0);
  const [unimportantCount, setUnimportantCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  const calculateCheckedCount = (response) => {
    setCount(response.data.length);
    const checked = response.data.filter(item => item.checkbox);
    const highPriority = response.data.filter(item => item.priority === 1);
    const mediumPriority = response.data.filter(item => item.priority === 2);
    const lowPriority = response.data.filter(item => item.priority === 3);
    const unimportant = response.data.filter(item => item.priority === 4);
    setCheckedCount(checked.length);
    setHighPriorityCount(highPriority.length);
    setMediumPriorityCount(mediumPriority.length);
    setLowPriorityCount(lowPriority.length);
    setUnimportantCount(unimportant.length);
  }

  const getTotosData = () => {
    api({
      url: "todolist/mytodolist/",
    }).then(calculateCheckedCount);
  };

  useEffect(() => {
    getTotosData();
  }, []);

  const getText = () => {
    if (count === 0) {
      return "You have no todos. Add one!";
    } else {
      let text = "";
      if (count === 1) {
        text += "You have one todo. ";
        if (checkedCount === 0) {
          text += "It's not checked yet!";
        } else {
          text += "It's checked, consider removing it!";
        }
      } else {
        text += `You have ${count} todos. `;
        if (checkedCount === 0) {
          text += "None of them are checked!";
        } else if (checkedCount === count) {
          text += "All of them are checked, consider removing them!";
        } else if (checkedCount === 1) {
          text += "One of them is checked.";
        } else {
          text += `${checkedCount} of them are checked.`;
        }
      }
      return text;
    }
  }

  return <Card sx={{
    p: 2,
    height: "100%"
  }}>
    <Stack spacing={1}>
      <Typography
        variant="h6"
        component="h1"
        textAlign="start"
        sx={{
          flexGrow: 1
        }}
      >
        Todos
      </Typography>
      <Divider />
      <Typography variant="body1" component="p">
        {getText()}
      </Typography>
      <Typography variant="body2" component="p">
        {highPriorityCount} high priority Todos
      </Typography>
      <Typography variant="body2" component="p">
        {mediumPriorityCount} medium priority Todos
      </Typography>
      <Typography variant="body2" component="p">
        {lowPriorityCount} low priority Todos
      </Typography>
      <Typography variant="body2" component="p">
        {unimportantCount} unimportant Todos
      </Typography>
      <Stack
        direction="row"
        justifyContent="end"
      >
        <Button onClick={() => navigate("/my/todoapp")}>
          Manage your Todos
        </Button>
      </Stack>
    </Stack>
  </Card>
};

export default DashboardTodosCard;