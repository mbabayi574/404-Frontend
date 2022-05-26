import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenContext } from "App";
import FileItem from "./fileItem";


const ViewDocument = () => {
	console.log(useLocation());
  const { token } = useContext(TokenContext);
	const {state} = useLocation();
	const { id, title, text, files_set } = state;
	const [ files, setFiles ] = useState([]);
  const navigate = useNavigate();
	useEffect(() => {
		setFiles(files_set);
	}, [])

	const [openDialog, setOpenDialog] = useState(false);

	const handleDelete = () => {
		// DELETE API Call
		setOpenDialog(false);
		var config = {
			method: "delete",
			url: `http://404g.pythonanywhere.com/notepad/note/deltenote/${id}`,
			headers: {
				Authorization: "Bearer " + token,
			},
		};
		axios(config)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					navigate('/my/documents');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const deleteFile = (id) => {
		setFiles(files.filter(file => file.id !== id));
	}

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
					height: "93vh",
        }}
				>
				<Card sx={{
					p: 1,
					width: "100%",
					height: "100%"
				}}>
					<Stack spacing={1} sx={{ height: "100%", width: "100%" }}>
						<Stack spacing={2} direction="row" sx={{
							alignItems: "center",
						}}>
							<Tooltip title="Go back">
								<IconButton onClick={() => navigate(-1)}>
									<ArrowBackIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete">
								<IconButton onClick={() => setOpenDialog(true)}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</Stack>
						<Divider />
						<Stack
							spacing={2}
							sx={{
								p: 1,
								flexGrow: 1,
								maxHeight: "100%",
							}}
						>
							<Typography variant="h5">
								{title}
							</Typography>
							<Typography
								variant="body1"
								sx={{
									whiteSpace: "pre-wrap",
									width: "100%",
									flexGrow: 1,
									maxHeight: "87%",
									overflowY: "auto"
								}}
							>
								{text}
							</Typography>
							<Stack spacing={1} direction="row" sx={{
								alignItems: "center",
							}}>
								
								{
									files.length === 0
									|| <Stack direction="row" spacing={1} sx={{
										flexGrow: 1,
										maxWidth: "auto",
										overflowX: "auto"
									}}>
										{
											files.map(file => <FileItem file={file} delete={deleteFile}/>)
										}
									</Stack>
								}
							</Stack>
						</Stack>
					</Stack>
				</Card>
      </Container>
			<Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this document? It will be lost forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ViewDocument;