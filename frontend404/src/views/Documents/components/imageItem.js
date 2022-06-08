import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";

const ImageItem = ({ image }) => {
  const [open, setOpen] = useState(false);
  const { name, url } = image;

  useEffect(() => {
    console.log(`OPEN: ${open}`);
  }, [open])

  const viewModal = (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
      </Card>
    </Modal>
  )
  return (
    <Box
      sx={{
        height: "120px"
      }}
    >
      <img src={url}
        onClick={() => setOpen(true)}
        style={{
          height: "100%"
        }} />
      {viewModal}
    </Box>
  )
}

export default ImageItem;