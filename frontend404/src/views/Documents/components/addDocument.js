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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "useAPI";

const AddDocument = () => {
  const navigate = useNavigate();
	const api = useAPI();
  const [error, setError] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
	const handleAddFile = (event) => {
    const findDuplicate = (file) => (
      files.find(f => (
        file.name         === f.name &&
        file.lastModified === f.lastModified &&
        file.size         === f.size &&
        file.type         === f.type
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
          navigate("/my/documents");
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
        // width: {
        //   xs: "md",
        //   md: "lg",
        // },
        p: 1,
      }}
    >
      <Stack spacing={1} sx={{ height: "100%", width: "100%" }}>
        <Typography variant="h5">New Document</Typography>
        <Divider />
        <Stack sx={{p: 1}}>
          <TextField
            error={error.hasOwnProperty("title")}
            helperText={error.hasOwnProperty("title") ? error.title[0] : " "}
            size="small" fullWidth label="Title"
            value={title} onChange={handleTitleChange} />
          <TextField fullWidth multiline
            error={error.hasOwnProperty("content")}
            helperText={error.hasOwnProperty("content") ? error.content[0] : " "}
          minRows={5} maxRows={15} value={content} onChange={handleContentChange} />
          <Stack spacing={1} direction="row" sx={{alignItems: "center"}}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
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
                      alignItems: "center"}}
                    >
                      <Typography sx={{mt: 1}} noWrap variant="body1">{file.name}</Typography>
                      <IconButton onClick={event => handleRemoveFile(event, file.name)}>
                        <ClearIcon/>
                      </IconButton>
                    </Card>)
                }
              </Stack>
            }
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
export default AddDocument;