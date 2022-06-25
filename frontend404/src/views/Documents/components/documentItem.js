import FileItem from "./fileItem";
import useAPI from "useAPI";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import DocumentModal from "./documentModal";

const DocumentItem = ({ document, reload }) => {
  const { id, title, text, files_set } = document;
  const [files, setFiles] = useState([]);
  const api = useAPI();
  useEffect(() => {
    setFiles(files_set);
  }, [])

  const [openModal, setOpenModal] = useState(false);

  const deleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  }

  return (
    <>
      <Card
        sx={{
          p: 2,
          width: "100%",
          height: "100%"
        }}>
        <Stack
          spacing={1}
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <Typography variant="h6">
              {title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              textOverflow: "ellipsis",
              width: "100%",
              flexGrow: 1,
              maxHeight: "auto",
              overflowY: "hidden"
            }}
            onClick={() => setOpenModal(true)}
          >
            {text}
          </Typography>
          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" sx={{
            alignItems: "center",
          }}>

            {
              files.length === 0
              || <Stack direction="row" spacing={1} sx={{
                flexGrow: 1,
                maxWidth: "auto",
                overflowX: "auto"
              }}>
                {
                  files.map(file => (
                    <FileItem file={file}
                      // onDelete={() => handleDeleteFile(file.id)}
                    />
                  ))
                }
              </Stack>
            }
          </Stack>
        </Stack>
      </Card>
      <DocumentModal
        document={document}
        deleteFile={deleteFile}
        reload={reload}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};
export default DocumentItem;