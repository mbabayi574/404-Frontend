import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI from "useAPI";

const DashboardFoodCard = () => {
  const api = useAPI();
  const [reserved, setReserved] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReservedFood();
  }, []);

  const getReservedFood = () => {
    // getReservation().then(getReservedFoodName);
    getReservation();
  };

  const getReservation = () => {
    const today = new Date().toISOString().split("T")[0];
    // return api({
    //   url: "Food/get_reservations",
    //   data: {
    //     start_date: today,
    //     end_date: today,
    //   }
    // });
  };

  const getReservedFoodName = (response) => {
    const reservations = response.data;
    if (reservations.length === 0) {
      setReserved(null);
    } else {
      const food = reservations[0].food;
      api({
        url: `Food/get_food_name/${food}`
      }).then(response => {
        setReserved(response.data.name);
      });
    }
  }

  return (
    <Card sx={{
      padding: 2,
    }}>
      <Stack spacing={1}>
        <Typography variant="h6" component="h1" textAlign="start">
          Food
        </Typography>
        <Divider />
        <Typography variant="body1" component="p" textAlign="start">
          You have reserved {reserved || "Nothing"} for today!
        </Typography>
        <Stack
          direction="row"
          justifyContent="end"
        >
          <Button onClick={() => navigate("/my/food_manager")}>
            Manage your food reservations
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DashboardFoodCard;