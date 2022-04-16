import { Box, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AccountProfile } from "./AccountProfile ";
import { AccountProfileDetails } from "./account-profile-details";

const Profile = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          AccountProfile
        </Typography>
        <Grid container spacing={3} backgroundColor="primary.dark">
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
            backgroundColor="primary.dark"
            color="03A9F4"
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Profile;
