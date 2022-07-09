import DocumentItem from "./components/documentItem";
import NewDocument from "./components/newDocument";
import useAPI from "useAPI";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";

const Documents = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const api = useAPI();
  const documentsPerPage = 4;

  useEffect(() => {
    getDocuments();
  }, [page]);

  useEffect(() => {
    setPage(Math.max(Math.min(page, pageCount), 1));
  }, [page, pageCount])

  const getDocuments = () => {
    var config = {
      method: "get",
      url: "notepad/note/showmynotes",
      params: {
        page: page
      }
    };
    api(config)
      .then((response) => {
        setDocuments(response.data.results);
        const count = response.data.count;
        setPageCount(Math.ceil(count / documentsPerPage));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  const DocumentsView = () => {
    const DocumentSkeleton = () => (
      <Skeleton variant="rectangular"
        sx={{
          width: "100%",
          height: "36vh",
        }}
      />
    )
    if (loading) {
      return (
        <Stack spacing={2} sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DocumentSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <DocumentSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <DocumentSkeleton />
            </Grid>
            <Grid item xs={12} md={6}>
              <DocumentSkeleton />
            </Grid>
          </Grid>
          <Pagination
            count={pageCount}
            page={page} onChange={(event, value) => setPage(value)}
          />
        </Stack>
      );
    } else if (documents.length === 0) {
      return (
        <Typography variant="h3" color="text.secondary" textAlign="center">
          Documents you add will appear here
        </Typography>
      );
    }
    const items = new Array(documentsPerPage).fill()
      .map((_, index) => documents[index]);
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
              <Box height="36vh">
                {document
                  ? <DocumentItem document={document} reload={getDocuments} />
                  : <Box width="100%" height="100%" />
                }
              </Box>
            </Grid>
          ))}
        </Grid>
        <Pagination
          color="primary"
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
          <Box flexGrow={1}
            minWidth="300px"
            width={{
              xs: "40vw",
              md: "40vw",
              lg: "calc(45vw - 280px)"
            }}
          >
            <NewDocument reload={getDocuments} />
          </Box>
          <Box sx={{
            height: "100%",
            width: {
              xs: "50vw",
              md: "50vw",
              lg: "45vw",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <DocumentsView />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Documents;