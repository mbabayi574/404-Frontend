import FileItem from "./fileItem";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PreviewIcon from "@mui/icons-material/Preview";
import DocumentModal from "./documentModal";

const DocumentItem = ({ document, reload }) => {
  const { id, title, text, files_set } = document;
  const [files, setFiles] = useState([]);
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
        onClick={() => setOpenModal(true)}
        sx={{
          p: 2,
          width: "100%",
          height: "100%"
        }}
      >
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
            <Badge
              badgeContent={files.length}
              color="primary"
              max={99}
            >
              <PreviewIcon
              color="primary"
              />
            </Badge>
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
          >
            {text}
          </Typography>
          <Box flexGrow={1} />
        </Stack>
      </Card>
      <DocumentModal
        document={document}
        onDeleteFile={deleteFile}
        reload={reload}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};
export default DocumentItem;