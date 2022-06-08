import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileItem from "./fileItem";
import useAPI from "useAPI";


const DocumentItem = ({ document, reload }) => {

  const { state } = useLocation();
  const { id, title, text, files_set } = document;
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const api = useAPI();
  useEffect(() => {
    setFiles(files_set);
  }, [])

  const [openDialog, setOpenDialog] = useState(false);

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
    <>
      <Card sx={{
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
          <Box sx={{
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
              maxHeight: "80%",
              overflowY: "auto"
            }}
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
                  files.map(file => <FileItem file={file} delete={deleteFile} />)
                }
              </Stack>
            }
          </Stack>
        </Stack>
      </Card>
      {deleteDialog}
    </>
  );
};
export default DocumentItem;