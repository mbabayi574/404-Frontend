import { Box, Container, Grid } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  /* city: "Tabriz",
  country: "Iran",
  jobTitle: "Senior Developer",
  name: "Babak Behkam",
  timezone: "GTM-7",*/
};
const HrDesk = () => (
  //<Container maxWidth="xl">
  <Card>
    <Grid container>
      <Grid item lg={4} md={6} xs={6}>
        <Box
          sx={{
            alignItems: "normal",
            display: "flex",
            flexDirection: "row",
            bgcolor: "#cfe8fc",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mt: 1,
              ml: 2,
              width: 64,
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            sx={{
              mt: 3,
              mr: 10,
              ml: 8,
            }}
          >
            AmirMahdi Ikani
          </Typography>
        </Box>
        <Card
          sx={{
            alignItems: "normal",
            display: "flex",
            flexDirection: "row",
            bgcolor: "#cfe8fc",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mt: 1,
              ml: 2,
              width: 64,
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            sx={{
              mt: 3,
              mr: 10,
              ml: 8,
            }}
          >
            AmirMahdi Ikani
          </Typography>
        </Card>
        <Card
          sx={{
            alignItems: "normal",
            display: "flex",
            flexDirection: "row",
            bgcolor: "#cfe8fc",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mt: 1,
              ml: 2,
              width: 64,
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            sx={{
              mt: 3,
              mr: 10,
              ml: 8,
            }}
          >
            Ali Bagherzade
          </Typography>
        </Card>
      </Grid>
      <Grid item lg={8} md={6} xs={12} color="03A9F4">
        <Card>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              // src={user.avatar}
              sx={{
                height: 124,
                mt: 2,
                mb: 2,
                width: 124,
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>

          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>FirstName : </small>
                    <strong>hosein</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>LastName: </small>
                    <strong> Naseri</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>UserName: </small>
                    <strong> 1234567</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Father Name: </small>
                    <strong> basom</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Mother Name: </small>
                    <strong> zahra</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Email Address: </small>
                    <strong> fdgk@gmail.com</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>BirthDate: </small>
                    <strong> 3/2/2012</strong>
                  </span>
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>PhoneNumber: </small>
                    <strong> 09123456789</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Personal ID: </small>
                    <strong> 123456789</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Address: </small>
                    <strong> tehran,jabar street</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Postal Code: </small>
                    <strong> 456789654</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Gender: </small>
                    <strong>Male</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Role: </small>
                    <strong> salam</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Marital Status: </small>
                    <strong> single</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Degree of education : </small>
                    <strong> PHD</strong>
                  </span>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div>
                  <span>
                    <small>Company: </small>
                    <strong> kale</strong>
                  </span>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </Grid>
    </Grid>
  </Card>
  //</Container>
);
export default HrDesk;
