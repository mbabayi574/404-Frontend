import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
					height:'fit-content',
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
					}}>{document.text}</Typography>
					<Stack sx={{height: "fit-content"}} spacing={1} direction="row">
						{
							document.files_set.map((file) => (
									<Card sx={{
										px: 1, py: 0,
										width: "max-content",
										backgroundColor: "divider"}}
									>
										<Typography noWrap variant="caption">{file.file.split("/").pop()}</Typography>
									</Card>
							))
						}
					</Stack>
				</Box>
			</Stack>
		)
	}

  useEffect(() => {
    var config = {
        method: "get",
        url: "http://127.0.0.1:8000/notepad/note/showmynotes",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            setDocuments(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
					<Card sx={{p: 1}}>
						<Stack spacing={1} sx={{ height: "100%", width: "100%" }}>
							<Stack spacing={2} direction="row" sx={{
								alignItems: "center",
							}}>
								<Button
									variant="contained"
									size="small"
									onClick={() => navigate('/my/documents/add')}
									startIcon={<AddIcon />}
								>
									Add Document
								</Button>
							</Stack>
							<Divider />
							<Stack
								spacing={0.5}
								divider={<Divider flexItem/>}
								sx={{
									width: "100%",
									height: "80vh",
									overflowY: "auto",
									alignItems: "center",
								}}
							>
								{documents.length === 0
									? <Box sx={{
										width: "100%",
										height: "80vh",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}>
										<Typography variant="h3">
											No notes here
										</Typography>
									</Box>
									: documents.map((document) => (
									<DocumentItem document={document} />
								))}
							</Stack>
						</Stack>
					</Card>
        </Stack>
      </Container>
    </Box>
  );
};
export default Documents;