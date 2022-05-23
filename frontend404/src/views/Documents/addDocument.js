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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "App";

const AddDocument = () => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  // const [attachments, setAttachments] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
	// const handleAddFile = (event) => {
  //   const findDuplicate = (file) => (
  //     attachments.find(f => (
  //       file.name         === f.name &&
  //       file.lastModified === f.lastModified &&
  //       file.size         === f.size &&
  //       file.type         === f.type
  //     ))
  //   );
  //   let newFiles = []
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     let file = event.target.files[i];
  //     let duplicate = findDuplicate(file);
  //     if (!duplicate) {
  //       newFiles.push(file);
  //     }
  //   }
	// 	setAttachments([...attachments, ...newFiles]);
	// }
  const handleAddFile = (event) => {
    setAttachment(event.target.files[0]);
  }
  // const handleRemoveFile = (event, name) => {
	// 	setAttachments(attachments.filter(file => file.name !== name));
	// }
  const handleRemoveFile = (event, name) => {
		setAttachment(null);
	}
	// console.log(attachments);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newError = {};
    if (!title)
      newError.title = ["This field may not be null."];

    console.log(newError);
    if (Object.keys(newError).length !== 0) {
      setError(newError);
      return;
    }

    navigate("/my/documents");

		// let formData = new FormData();
		// formData.append("title", title);
		// formData.append("content", content);
		// // for (let i = 0; i < attachments.length; i++) {
		// // 	formData.append(`files[${i}]`, attachments[i], attachments[i].name);
		// // }
		// formData.append(`file`, attachment, attachment.name);


    // var config = {
    //   method: "post",
    //   url: "http://404g.pythonanywhere.com/ServiceCounter/admintransportations/",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   data: formData,
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       // navigate("/documents");
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error.response.data);
    //   });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
          height: "100%",
        }}
      >
        <Stack spacing={3} sx={{ height: "100%", width: "100%" }}>
          <Box>
            <Typography variant="h4">Add Document</Typography>
          </Box>
					<Card
						sx={{
							width: "100%",
							height: "100%",
							p: 2,
						}}
					>
						<Stack spacing={2}>
							<TextField fullWidth label="Title" value={title} onChange={handleTitleChange} />
							<Divider />
							<TextField fullWidth multiline
							minRows="20" value={content} onChange={handleContentChange} />
							<Divider />
							<Stack spacing={1} direction="row" sx={{alignItems: "center"}}>
								<Button variant="contained" onClick={handleSubmit}>Submit</Button>
								<IconButton color="primary" component="label">
									<input onChange={handleAddFile}
										type="file"
										hidden
                    // multiple
									/>
									<AttachFileIcon />
								</IconButton>
								{
									// attachments.length == 0
									attachment === null
									? <Typography variant="body1">No files attached</Typography>
									: <Stack direction="row" spacing={1} sx={{
                    flexGrow: 1,
                    maxWidth: "auto",
                    overflowX: "auto"
                  }}>
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
                      <Typography sx={{mt: 1}} noWrap variant="body1">{attachment.name}</Typography>
                      <IconButton onClick={event => handleRemoveFile(event, attachment.name)}>
                        <ClearIcon/>
                      </IconButton>
                    </Card>
                    {/* {
                      attachments.map(file => 
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
                    } */}
                  </Stack>
								}
							</Stack>
						</Stack>
					</Card>
        </Stack>
      </Container>
    </Box>
  );
};
export default AddDocument;