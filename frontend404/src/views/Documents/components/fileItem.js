import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { saveAs } from 'file-saver'
import useAPI from "useAPI";

const FileItem = ({ file, delete: deleteFile }) => {
  const api = useAPI();
  const name = file.file.split("/").pop();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    var config = {
      method: "get",
      url: file.file,
      responseType: "blob",
    };
    api(config)
      .then(response => response.data)
      .then(blob => {
        saveAs(blob, name);
        handleClose();
      });
  }

  const handleDelete = () => {
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
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const options = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleDownload}>
        <Typography variant="caption">
          Download
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <Typography color="" variant="caption">
          Remove
        </Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "max-text",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          flexShrink: 0,
          justifyContent: "center"
        }}
      >
        <Button variant="text"
          size="small" onClick={handleClick}
          sx={{
            color: "text.primary"
          }}
        >
          <Typography variant="caption">
            {name}
          </Typography>
        </Button>
      </Card>
      {options}
    </>
  )
}

export default FileItem;