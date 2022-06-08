import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const ImageItem = ({ src }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const viewModal = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <img src={src}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
          }} />
      </Box>
    </Modal>
  )
  return (
    <Box
      onClick={() => setOpen(true)}
      sx={{
        height: "120px"
      }}
    >
      <img src={src}
        style={{
          height: "100%"
        }} />
      {viewModal}
    </Box>
  )
}

export default ImageItem;