import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const FoodEmployee = (props) => {
  return (
    <Box
      component="main"
      flexGrow={1}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
        }}
      >
        Food Employee
      </Container>
    </Box>
  )
};

export default FoodEmployee;