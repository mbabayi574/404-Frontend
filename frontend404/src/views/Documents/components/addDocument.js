import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from '@mui/icons-material/Clear';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";
import ImageItem from "./imageItem";
import FileItem from "./fileItem";

const AddDocument = ({ reload }) => {
  const navigate = useNavigate();
  const api = useAPI();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileId, setFileId] = useState(0);

  const clear = () => {
    setTitle("");
    setContent("");
    setFiles([]);
    setImages([]);
  };

  useEffect(() => {
    setImagePreviews(images.map(image => ({ name: image.name, url: URL.createObjectURL(image) })));
    return () => {
      imagePreviews.forEach(objectUrl => URL.revokeObjectURL(objectUrl))
    };
  }, [images])

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleAddFile = (event) => {
    let newFiles = []
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      let id = fileId + i;
      newFiles.push({ file: file, id: id });
    }
    setFiles([...files, ...newFiles]);
    setFileId(fileId + event.target.files.length);
  }
  const handleDeleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  }

  const handleAddImage = (event) => {
    setImages([...images, event.target.files[0]]);
  }
  const handleRemoveImage = (name) => {
    setImages(images.filter(image => image.name !== name));
  }

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newError = null;
    if (!title)
      newError = "Document title cannot be empty.";
    if (!content)
      newError = "Document text cannot be empty.";
    setError(newError);
    if (newError) {
      return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("text", content);
    files.forEach(file => {
      formData.append("files", file.file);
    });
    images.forEach(image => {
      formData.append("files", image);
    });
    console.log(formData);

    var config = {
      method: "post",
      url: "notepad/note/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    setLoading(true);
    api(config)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          clear();
          reload();
        }
        setLoading(false);
      })
      .catch((error) => {
        error.response.data.forEach(key => {
          setError(error.response.data[key]);
          return;
        })
        setLoading(false);
      });
  };

  const errorAlert = (
    <Snackbar
      open={error}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseAlert}
        variant="filled"
        severity="error"
        sx={{ width: "100%" }}
      >
        {error}
      </Alert>
    </Snackbar>
  )

  const successAlert = (
    <Snackbar
      open={success}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseAlert}
        variant="filled"
        severity="success"
        sx={{ width: "100%" }}
      >
        Document Added!
      </Alert>
    </Snackbar>
  )

  return (
    <Card
      sx={{
        width: "100%",
        height: "fit-content",
        p: 1,
      }}
    >
      <Stack spacing={1} sx={{ height: "100%", width: "100%" }}>
        <TextField
          size="small" fullWidth label="Title"
          value={title} onChange={handleTitleChange} />
        <TextField fullWidth multiline
          minRows={5} maxRows={15}
          InputProps={{ placeholder: "Type something" }}
          value={content} onChange={handleContentChange} />
        {
          images.length === 0 ||
          <Stack spacing={1} direction="row" sx={{ maxWidth: "400px", height: "120px", alignItems: "center" }} >
            {
              imagePreviews.map(image => (
                <ImageItem image={image} onDelete={handleRemoveImage} />
              ))
            }
          </Stack>
        }
        <Stack spacing={0} direction="row" sx={{ maxWidth: "400px", alignItems: "center" }}>
          <Box sx={{ mr: 1, position: "relative" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <IconButton color="primary" component="label">
            <input onChange={handleAddImage}
              type="file"
              accept="image/*"
              hidden
            />
            <AddPhotoAlternateIcon />
          </IconButton>
          <IconButton color="primary" component="label">
            <input onChange={handleAddFile}
              type="file"
              hidden
              multiple
            />
            <AttachFileIcon />
          </IconButton>
          {
            files.length == 0
              ? <Typography variant="body1">No files attached</Typography>
              : <Stack direction="row" spacing={1} sx={{
                flexGrow: 1,
                maxWidth: "auto",
                overflowX: "auto"
              }}>
                {
                  files.map(file =>
                    <FileItem noDownload
                      file={{ file: file.file.name }}
                      onDelete={() => handleDeleteFile(file.id)}
                    />
                  )
                }
              </Stack>
          }
        </Stack>
      </Stack>
      {successAlert}
      {errorAlert}
    </Card>
  );
};
export default AddDocument;