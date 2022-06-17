import FileItem from "./fileItem";
import ImageItem from "./imageItem";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

const DocumentModal = (props) => {
  const { document, ...others } = props;
  const { id, title, text, files_set } = document;
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const imageFiles = files_set.filter(file => isImage(file));
    setImages(imageFiles.map(file => getImageData(file)))
    // imageFiles.forEach(file => {
    //   addImage(file);
    // });
    setFiles(files_set.filter(file => !isImage(file)));
  }, [])

  useEffect(() => {
    if (others.open) {
      console.log(images);
    }
  }, [others])

  const getImageData = (file) => {
    const name = file.file.split("/").pop();
    const url = "http://404g.pythonanywhere.com" + file.file;
    return {
      name: name,
      url: url,
      id: file.id,
    };
    // setImages([...images, image]);
  }

  const isImage = (file) => {
    return file.file.match(/.(jpg|jpeg|png|gif)$/i);
  }

  return (
    <Modal
      {...others}
    >
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
            <Tooltip title="Edit" sx={{
            }}>
              <IconButton size="small">
                <EditIcon fontSize="small" />
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
              // width: "fit-content",
              overflowX: "auto",
              flexShrink: 0,
              height: "110px",
            }}>
              {
                images.map(image => (
                  <ImageItem image={image}
                  sx={{
                    height: "100px"
                    // width: "fit-content"
                    // width: "fit-content"
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
                files.map(file => (
                  <FileItem file={file}
                  />
                ))
              }
            </Stack>
          }
        </Stack>
      </Card>
    </Modal>
  )
};

export default DocumentModal;