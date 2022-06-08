import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";
import ImageItem from "./imageItem";

const AddDocument = ({reload}) => {
  const navigate = useNavigate();
  const api = useAPI();
  const [error, setError] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    const findDuplicate = (file) => (
      files.find(f => (
        file.name === f.name &&
        file.lastModified === f.lastModified &&
        file.size === f.size &&
        file.type === f.type
      ))
    );
    let newFiles = []
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      let duplicate = findDuplicate(file);
      if (!duplicate) {
        newFiles.push(file);
      }
    }
    setFiles([...files, ...newFiles]);
  }
  const handleRemoveFile = (event, name) => {
    setFiles(files.filter(file => file.name !== name));
  }

  const handleAddImage = (event) => {
    setImages([...images, event.target.files[0]]);
  }
  const handleRemoveImage = (event, name) => {
    setImages(images.filter(image => image.name !== name));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newError = {};
    if (!title)
      newError.title = ["This field may not be null."];
    if (!content)
      newError.content = ["This field may not be null."];

    console.log(newError);
    if (Object.keys(newError).length !== 0) {
      setError(newError);
      return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("text", content);
    files.forEach(file => {
      formData.append("files", file);
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

    api(config)
      .then((response) => {
        if (response.status === 200) {
          clear();
          reload();
        }
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

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
                <ImageItem image={image} />
              ))
            }
          </Stack>
        }
        <Stack spacing={0} direction="row" sx={{ maxWidth: "400px", alignItems: "center" }}>
          <Button variant="contained" onClick={handleSubmit} sx={{ mr: 1 }}>Submit</Button>
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
                    <Card sx={{
                      pr: 1, pl: 2, py: 0,
                      width: "max-content",
                      height: "100%",
                      backgroundColor: "divider",
                      display: "flex",
                      flexDirection: "row",
                      flexShrink: 0,
                      alignItems: "center"
                    }}
                    >
                      <Typography sx={{ mt: 1 }} noWrap variant="body1">{file.name}</Typography>
                      <IconButton onClick={event => handleRemoveFile(event, file.name)}>
                        <ClearIcon />
                      </IconButton>
                    </Card>)
                }
              </Stack>
          }
        </Stack>
      </Stack>
    </Card>
  );
};
export default AddDocument;