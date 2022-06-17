import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageItem = ({ image, onDelete, sx }) => {
  const [open, setOpen] = useState(false);
  const { id, name, url } = image;

  const handleClose = () => setOpen(false);

  console.log(image);

  const handleDelete = () => {
    handleClose();
    onDelete(id);
  }

  const viewModal = (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <img src={url}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
          }} />
        <Stack spacing={0} direction="row" sx={{ pl: 2, pr: 1, pb: 1, width: "100%", alignItems: "center" }}>
          <Typography variant="body1">
            {name}
          </Typography>
          <Box flexGrow={1} />
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Card>
    </Modal>
  )
  return (
    <Box
      sx={sx}
    >
      <img src={url}
        onClick={() => setOpen(true)}
        style={{
          height: "100%",
          // width: "100%",
        }} />
      {viewModal}
    </Box>
  )
}

export default ImageItem;