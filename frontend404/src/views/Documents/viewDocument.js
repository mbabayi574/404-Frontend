import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenContext } from "App";

const ViewDocument = () => {
	const {state} = useLocation();
	console.log(useLocation());
  const { token } = useContext(TokenContext);
	// const [id, setId] = useState(null);
	// const [title, setTitle] = useState(null);
	// const [content, setContent] = useState(null);
	// const [attachment, setAttachment] = useState(null);
	const { id, title, content, attachment } = state;
  const navigate = useNavigate();

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
				<Stack spacing={3} sx={{ height: "100%", width: "100%", pt: 1}}>
					<Stack direction="row" spacing={2} sx={{width: "100%", px: 0.5}}>
						<Typography variant="h4" sx={{
							flexGrow: 1
						}}>My Documents</Typography>
						<Button variant="contained" href="/my/documents/add" startIcon={<AddIcon />}>
							Add Document
						</Button>
					</Stack>
					<Card sx={{
						p: 1,
						width: "100%",
						flexGrow: 1,
						maxHeight: "auto"
					}}>
						<Stack spacing={1} sx={{ height: "100%", width: "100%" }}>
							<Stack spacing={2} direction="row" sx={{
								alignItems: "center",
							}}>
								<Tooltip title="Go back">
									<IconButton onClick={() => navigate(-1)}>
										{/* <ChevronLeftIcon /> */}
										<ArrowBackIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Edit">
									<IconButton>
										<EditIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Delete">
									<IconButton>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</Stack>
							<Divider />
							<Stack spacing={2} sx={{p: 1}}>
								<Typography variant="h5">
									{title}
								</Typography>
								<Typography
									variant="body1"
									sx={{
										width: "100%",
										flexGrow: 1,
										maxHeight: "auto",
										overflowY: "auto"
									}}
								>
									{content}
								</Typography>
								<Stack spacing={1} direction="row" sx={{
									alignItems: "center"
								}}>
									{
										attachment === null
										// files.length === 0
										|| <Stack direction="row" spacing={1} sx={{
											flexGrow: 1,
											maxWidth: "auto",
											overflowX: "auto"
										}}>
											{/* {
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
											} */}
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
												<Typography sx={{mt: 1}} noWrap variant="body1">{attachment}</Typography>
												<IconButton>
													<ClearIcon/>
												</IconButton>
											</Card>
										</Stack>
									}
								</Stack>
							</Stack>
						</Stack>
					</Card>
				</Stack>
      </Container>
    </Box>
  );
};
export default ViewDocument;