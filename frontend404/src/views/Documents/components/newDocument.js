import FileItem from "./fileItem";
import ImageItem from "./imageItem";
import useAPI from "useAPI";
import useForm from "useForm";
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
  const postData = () => {
    setLoading(true);
    const formData = prepareData(values);
    const config = makeApiConfig(formData);
    api(config)
      .then(response => {
        setSuccess(true);
        onPostSuccess(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  const prepareData = () => {
    let formData = new FormData();
    formData.set("title", values.title);
    formData.set("text", values.text);
    files.forEach(file => {
      formData.append("files", file.file);
    });
    images.forEach(image => {
      formData.append("files", image.file);
    });
    console.log(formData);
    return formData;
  }

  const makeApiConfig = (formData) => {
    return {
      method: "post",
      url: "notepad/note/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
  }

  const clearFiles = () => {
    setFiles([]);
    setImages([]);
  };

  const validate = (values) => {
    let errors = {}
    if (!values.title) {
      errors.title = "Please fill out the title";
    }
    if (!values.text) {
      errors.text = "Please fill out the text";
    }
    return errors;
  }

  const onPostSuccess = (response) => {
    clearFiles();
    clearForm();
    reload();
  }

  const initialData = {
    title: "",
    text: "",
  };

  const {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors,
  } = useForm(postData, validate, initialData);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileId, setFileId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const api = useAPI();

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
  const handleRemoveFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  }

  const handleAddImage = (event) => {
    setImages([...images, { file: event.target.files[0], id: fileId }]);
    setFileId(fileId + 1);
  }
  const handleRemoveImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  }

  const successAlert = (
    <Snackbar
      open={success}
      autoHideDuration={3000}
      onClose={() => setSuccess(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => setSuccess(false)}
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
        id="title"
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        helperText={errors.title}
        size="small"
        fullWidth
      />
      <TextField
        id="text"
        name="text"
        value={values.text}
        onChange={handleChange}
        error={errors.text}
        helperText={errors.text}
        fullWidth
        multiline
        minRows={5}
        maxRows={15}
        InputProps={{
          placeholder: "Type something"
        }}
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
                    onDelete={() => handleRemoveFile(file.id)}
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
    </Card>
  );
};

export default NewDocument;