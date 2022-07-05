import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import profileImage from "data/profile-image.png";
import useUser from "useUser";

const DashboardProfileCard = () => {
  const { user } = useUser();

  const role = user.role === "E" ? "Employee" : "Manager";

  return <Card sx={{
    p: 1
  }}>
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box p={1}>
        <img src={profileImage} style={{
          height: "48px"
        }} />
      </Box>
      <Stack flexGrow={1}>
        <Typography variant="h6" component="h2">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body2" component="h2">
          {role} at {user.company}
        </Typography>
      </Stack>
    </Stack>
  </Card>
};

export default DashboardProfileCard;