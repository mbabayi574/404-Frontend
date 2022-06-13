import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";

const FinancialReports = () => {
  const [documents, setDocuments] = useState([]);
	const navigate = useNavigate();
	const api = useAPI();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
          height: "93vh",
        }}
      >
        <Grid container spacing={3}
          sx={{height: "100%"}}>
          <Grid item xs={4}>
            <Stack spacing={3} sx={{height: "100%"}}>
              <Card sx={{
                width: "100%",
                flexGrow: "1"
              }}>
                Add new event
              </Card>
              <Card sx={{
                width: "100%",
                flexGrow: "2"
              }}>
                List event
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{
              width: "100%",
              height: "100%",
            }}>
              Show reports
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FinancialReports;