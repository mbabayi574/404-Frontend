import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import { saveAs } from 'file-saver'
import useAPI from "useAPI";

const FileItem = ({ file, delete: deleteFile }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const api = useAPI();
  const name = file.file.split("/").pop();

  const handleDownload = () => {
    var config = {
      method: "get",
      url: file.file,
      responseType: "blob",
    };
    api(config)
      .then(response => response.data)
      .then(blob => saveAs(blob, name));
  }

  const handleDelete = () => {
    setOpenDialog(false);
    var config = {
      method: "delete",
      url: `notepad/note/showmynotes/deletefile/${file.id}`,
    };
    api(config)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          deleteFile(file.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteDialog = (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete this file? It will be lost forever.
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
        width: "max-text",
        height: "100%",
        backgroundColor: "divider",
        display: "flex",
        flexDirection: "row",
        flexShrink: 0,
        justifyContent: "center"
      }}
      >
        <Button variant="text"
          size="small" onClick={handleDownload}
          sx={{
            color: "text.primary"
          }}
        >
          <Typography variant="caption">
            {name}
          </Typography>
        </Button>
        <IconButton size="small" onClick={() => setOpenDialog(true)}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </Card>
      {deleteDialog}
    </>
  )
}

export default FileItem;