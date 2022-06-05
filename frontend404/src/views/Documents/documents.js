import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentItem from "./components/documentItem";
import useAPI from "useAPI";
import AddDocument from "./components/addDocument";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const api = useAPI();

  useEffect(() => {
    var config = {
      method: "get",
      url: "notepad/note/showmynotes",
    };
    api(config)
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setDocuments(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          height: "90vh",
        }}
      >
        <Stack spacing={1} direction="row" sx={{ p: 1, height: "100%", width: "100%" }}>
          <Box flexGrow={1}>
            <AddDocument />
          </Box>
          <Box sx={{
            height: "100%",
            width: {
              xs: "50vw",
              md: "60vw",
              lg: "50vw",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {documents.length === 0
              ?
              <Typography variant="h3" color="text.secondary">
                Document you add will appear here
              </Typography>
              :
              <Grid container spacing={2} sx={{
                height: "100%",
                overflowY: "auto"
              }}>
                {documents.map((document) => (
                  <Grid item xs={12} md={6}>
                    <Box height="35vh">
                      <DocumentItem document={document} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            }
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Documents;