import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentItem from "./components/documentItem";
import useAPI from "useAPI";
import AddDocument from "./components/addDocument";

const Documents = () => {
  const [page, setPage] = useState(1);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const api = useAPI();
  const documentsPerPage = 4;
  const pageCount = Math.ceil(documents.length / documentsPerPage);

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    setPage(Math.max(Math.min(page, pageCount), 1));
  }, [page, pageCount])

  const getDocuments = () => {
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
  }

  const DocumentsView = () => {
    const paginationStart = documentsPerPage * (page - 1);
    const items = new Array(documentsPerPage).fill()
      .map((_, index) => documents[paginationStart + index]);
    console.log(items);
    return (
      <Stack spacing={2} sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
      >
        <Grid container spacing={2}>
          {items.map((document) => (
            <Grid item xs={12} md={6}>
              <Box height="35vh">
                {document
                  ? <DocumentItem document={document} reload={getDocuments} />
                  : <Box width="100%" height="100%" />
                }
              </Box>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={pageCount}
          page={page} onChange={(event, value) => setPage(value)}
        />
      </Stack>
    );
  }


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
        <Stack spacing={2} direction="row" sx={{ p: 1, height: "100%", width: "100%" }}>
          <Box flexGrow={1} maxWidth="auto">
            <AddDocument reload={getDocuments} />
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
              <DocumentsView />
            }
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Documents;