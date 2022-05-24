import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "App";

const documentsPlaceholder = [
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
	{
		id: "1",
		title: "Resume",
		content: "This is Diyar Hamedi's resume as a frontend developer at 404 Group.",
		attachment: "Diyar Hamedi.pdf",
	},
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
	{
		id: "1",
		title: "Diary",
		content: "Dear Diary\n\
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		attachment: null,
	},
]

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const {token, } = useContext(TokenContext);
	const navigate = useNavigate();

	const DocumentItem = ({document}) => {
		const handleViewDocument = () => {
			console.log(document);
			navigate('/my/documents/' + document.id, {state: document});
		}
		return (
			<Stack
				direction="row"
				spacing={0.5}
				onClick={handleViewDocument}
				sx={{
					width:"100%",
					height:'100%',
					pt: 1,
					pb: 0.5,
					px: 1,
					justifyContent: "flex-start"
				}}
			>
				<Typography variant="h6" sx={{
					flexGrow: 1,
					flexShrink: 0
				}}>{document.title}</Typography>
				<Box sx={{height: "100%"}}>
					<Typography noWrap variant="body1" sx={{
						width: "1200px",
						overflow: "hidden",
						textOverflow: "ellipsis"
					}}>{document.content}</Typography>
					{
						document.attachment && <Card sx={{
							px: 1, py: 0,
							width: "max-content",
							backgroundColor: "divider"}}
						>
							<Typography noWrap variant="caption">{document.attachment}</Typography>
						</Card>
					}
				</Box>
			</Stack>
		// </Card>
		)
	}

  useEffect(() => {
	setDocuments(documentsPlaceholder);
    // API call
  }, []);

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
					<List sx={{
						width: "100%",
						flexGrow: 1,
						overflowY: "auto",
						maxHeight: "auto",
						borderRadius: 1,
						backgroundColor: "background.paper"
						}}
					>
						<Stack
							spacing={0.5}
							divider={<Divider flexItem/>}
							sx={{
								width: "100%",
								alignItems: "center",
							}}
						>
							{documents.map((document) => (
								<DocumentItem document={document} />
							))}
						</Stack>
					</List>
        </Stack>
      </Container>
    </Box>
  );
};
export default Documents;