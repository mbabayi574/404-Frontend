import FileItem from "./fileItem";
import ImageItem from "./imageItem";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import useAPI from "useAPI";

const DocumentModal = (props) => {
  const { document, reload, onDeleteFile, ...others } = props;
  const { id, title, text, files_set } = document;
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const api = useAPI();

  useEffect(() => {
    setFiles(files_set);
  }, [])

  const isImage = (file) => {
    return file.file.match(/.(jpg|jpeg|png|gif)$/i);
  }

  const getImageData = (file) => {
    const name = file.file.split("/").pop();
    const url = "http://404g.pythonanywhere.com" + file.file;
    return {
      name: name,
      url: url,
      id: file.id,
    };
  }

  const imageFiles = files.filter(file => isImage(file));
  const nonimageFiles = files.filter(file => !isImage(file));
  const images = imageFiles.map(file => getImageData(file));

  const handleDelete = () => {
    setOpenDialog(false);
    var config = {
      method: "delete",
      url: `notepad/note/deltenote/${id}`,
    };
    api(config)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDeleteFile = (id) => {
    var config = {
      method: "delete",
      url: `notepad/note/showmynotes/deletefile/${id}`,
    };
    api(config)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          deleteFile(id);
          onDeleteFile(id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  }

  const deleteDialog = (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete this document? It will be lost forever.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Modal
      {...others}
    >
      <>
        <Card sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "70vh",
          height: "90vh",
          p: 2
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
              <Tooltip title="Delete" sx={{
              }}>
                <IconButton size="small" onClick={() => setOpenDialog(true)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "pre-wrap",
                width: "100%",
                flexGrow: 1,
                maxHeight: "auto",
                overflowY: "auto"
              }}
            >
              {text}
            </Typography>
            <Box flexGrow={1} />
            {
              images.length === 0
              || <Stack direction="row" spacing={0.5} sx={{
                overflowX: "auto",
                flexShrink: 0,
                height: "110px",
              }}>
                {
                  images.map(image => (
                    <ImageItem image={image}
                      onDelete={handleDeleteFile}
                      sx={{
                        height: "100px"
                      }}
                    />
                  ))
                }
              </Stack>
            }
            {
              files.length === 0
              || <Stack direction="row" spacing={1} sx={{
                width: "100%",
                overflowX: "auto"
              }}>
                {
                  nonimageFiles.map(file => (
                    <FileItem file={file}
                      onDelete={() => handleDeleteFile(file.id)}
                    />
                  ))
                }
              </Stack>
            }
          </Stack>
        </Card>
        {deleteDialog}
      </>
    </Modal>
  )
};

export default DocumentModal;