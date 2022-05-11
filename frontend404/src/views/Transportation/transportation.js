// design #1

import { theme } from "../../theme";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import ServiceCard from "../../components/transportation/serviceCard";
import mapPlaceholder from "../../images/map-placeholder-1.png";
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
                            <Box sx={{
                                flexGrow: 1,
                                maxWidth: "auto",
                                bgcolor: "#dddddd",
                            }}>
                                <img
                                    styles={{width: "100%", height: "100%"}}
                                    src={mapPlaceholder} 
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
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