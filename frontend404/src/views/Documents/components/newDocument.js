import FileItem from "./fileItem";
import ImageItem from "./imageItem";
import useAPI from "useAPI";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const NewDocument = ({ reload }) => {
  const api = useAPI();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileId, setFileId] = useState(0);

  useEffect(() => {
    setImagePreviews(images.map(image => ({
      id: image.id,
      name: image.file.name,
      url: URL.createObjectURL(image.file)
    })));
    return () => {
      imagePreviews.forEach(objectUrl => URL.revokeObjectURL(objectUrl))
    };
  }, [images])

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
    setImages([...images, { file: event.target.files[0], id: fileId }]);
    setFileId(fileId + 1);
  }
  const handleRemoveImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  }

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(false);
  }

  const clear = () => {
    setFiles([]);
    setImages([]);
  };

  const getValidationError = (formData) => {
    if (!formData.get("title"))
      return "Document title cannot be empty.";
    if (!formData.get("text"))
      return "Document text cannot be empty.";
    return null;
  }

  const prepareData = (formData) => {
    files.forEach(file => {
      formData.append("files", file.file);
    });
    images.forEach(image => {
      formData.append("files", image);
    });
    console.log(formData.getAll("files"));
  }

  const makePostConfig = (formData) => {
    return {
      method: "post",
      url: "notepad/note/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
  }

  const onPostSuccess = (response) => {
    setSuccess(true);
    clear();
    reload();
    setLoading(false);
  }

  const onPostError = (error) => {
    error.response.data.forEach(key => {
      setError(error.response.data[key]);
      return;
    })
    setLoading(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    trySubmit(formData);
  };

  const trySubmit = (formData) => {
    const validateData = () => {
      const newError = getValidationError(formData);
      setError(newError);
      return newError === null;
    }

    const postData = (config) => {
      setLoading(true);
      api(config)
        .then(onPostSuccess)
        .catch(onPostError);
    }

    if (!validateData(formData)) {
      return;
    }
    prepareData(formData);
    var config = makePostConfig(formData);
    postData(config);
  }

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

  const form = (
    <Stack component="form" onSubmit={handleSubmit} spacing={1}
      sx={{ height: "100%", width: "100%" }}>
      <TextField
        size="small" fullWidth
        id="title" name="title" label="Title"
      />
      <TextField fullWidth multiline
        minRows={5} maxRows={15}
        id="text" name="text"
        InputProps={{ placeholder: "Type something" }}
      />
      {
        images.length === 0 ||
        <Stack spacing={1} direction="row"
          sx={{
            maxWidth: "100%", height: "130px",
            alignItems: "center", overflowX: "auto"
          }}
        >
          {
            imagePreviews.map(image => (
              <ImageItem image={image}
                onDelete={handleRemoveImage}
                sx={{ height: "110px" }}
              />
            ))
          }
        </Stack>
      }
      <Stack spacing={0} direction="row"
        sx={{
          maxWidth: "100%",
          alignItems: "center"
        }}
      >
        <Box sx={{ mr: 1, position: "relative" }}>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={<AddIcon />}
          >
            Add
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
  )

  return (
    <Card
      sx={{
        width: "100%",
        height: "fit-content",
        p: 1,
      }}
    >
      {form}
      {successAlert}
      {errorAlert}
    </Card>
  );
};

export default NewDocument;