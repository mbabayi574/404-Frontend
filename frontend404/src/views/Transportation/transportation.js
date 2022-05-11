import { theme } from "../../theme";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import ServiceCard from "../../components/transportation/serviceCard";
import mapPlaceholder from "../../images/map-placeholder.png";
import axios from "axios";

const ViewTransportationServicesView = () => {
    const [services, SetServices] = useState([])
    
    useEffect(() => {
        var config = {
            method: "get",
            url: "http://127.0.0.1:8000/ServiceCounter/admintransportations/",
            headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3NDQ1MjYzLCJqdGkiOiI0YjRiYmJhMWRmNzY0ODNiYWU1ZDJhMjI1MDc1YmFhZiIsInVzZXJfaWQiOjF9.ZxT5PX0vD014dblqpVw-RC82mvGhRNME7aUIq2KE_wc"
            },
        };
        axios(config)
            .then((response) => {
                console.log(response);
                console.log(response.data);
                if (response.status == 200)
                {
                    SetServices(response.data.filter(service => service.address && service.Return_time));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <Container maxWidth={false} sx={{
                    p: 3,
                    height: "100%",
                }}>
                    <Stack spacing={3} sx={{height: "100%", width: "100%"}}>
                        <Box>
                            <Typography
                                variant="h4"
                            >
                                View Services
                            </Typography>
                        </Box>

                        <Stack spacing={4} direction="row"
                            sx={{
                                flexGrow: 1,
                                height: "100%",
                                alignItems: "center"
                            }}
                        >
                            <Stack spacing={3} sx={{
                                height: "100%",
                                alignItems: "center"
                            }}>
                                <Card sx={{width: "100%", p: 2}}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                        sx={{
                                            flexGrow: 1,
                                            maxWidth: "auto"
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                            )
                                        }}
                                        placeholder="Search address"
                                        variant="outlined"
                                        />
                                        <Button variant="contained" startIcon={<AddIcon />}>
                                            Add Service
                                        </Button>
                                    </Stack>
                                </Card>
                                <Stack spacing={2} sx={{
                                    width: "fit-content",
                                }}>
                                    {
                                        services.map(service => (
                                            <ServiceCard service={service}/>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
                <Box sx={{
                    flexGrow: 1,
                    maxWidth: "auto",
                    height: "885px",
                }}>
                    <img
                        style={{
                            width: "760px",
                            height: "100%",
                            objectFit: "none",
                        }}
                        src={mapPlaceholder} 
                    />
                </Box>
            </Box>
        </ThemeProvider>
    )
};

const ViewTransportationServicesPage = () => {
    return (
        <DashboardLayout>
            <ViewTransportationServicesView />
        </DashboardLayout>
    )
};

export default ViewTransportationServicesPage;