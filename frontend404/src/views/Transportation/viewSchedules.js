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
import { useState } from "react";
import ScheduleCard from "../../components/transportation/scheduleCard";
import mapPlaceholder from "../../images/map-placeholder-1.png";

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const schedules = [
    {
        address: "Location 1",
        arrivalTime: {hour: 7, minute: 0},
        returnTime: {hour: 16, minute: 30},
        capacity: 25,
        capacityMax: 30,
        days: {
            "Sat": true,
            "Sun": true,
            "Mon": true,
            "Teu": true,
            "Wed": true,
            "Thu": false,
            "Fri": false
        },
        details: lorem,
    },
    {
        address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        arrivalTime: {hour: 7, minute: 0},
        returnTime: {hour: 16, minute: 30},
        capacity: 25,
        capacityMax: 30,
        days: {
            "Sat": true,
            "Sun": true,
            "Mon": true,
            "Teu": true,
            "Wed": true,
            "Thu": false,
            "Fri": false
        },
        details: lorem,
    },
    {
        address: "Location 3",
        arrivalTime: {hour: 7, minute: 0},
        returnTime: {hour: 16, minute: 30},
        capacity: 25,
        capacityMax: 30,
        days: {
            "Sat": true,
            "Sun": true,
            "Mon": true,
            "Teu": true,
            "Wed": true,
            "Thu": false,
            "Fri": false
        },
        details: lorem,
    },
    {
        address: "Location 4",
        arrivalTime: {hour: 7, minute: 0},
        returnTime: {hour: 16, minute: 30},
        capacity: 25,
        capacityMax: 30,
        days: {
            "Sat": true,
            "Sun": true,
            "Mon": true,
            "Teu": true,
            "Wed": true,
            "Thu": false,
            "Fri": false
        },
        details: lorem,
    },
    {
        address: "Location 5",
        arrivalTime: {hour: 7, minute: 0},
        returnTime: {hour: 16, minute: 30},
        capacity: 25,
        capacityMax: 30,
        days: {
            "Sat": true,
            "Sun": true,
            "Mon": true,
            "Teu": true,
            "Wed": true,
            "Thu": false,
            "Fri": false
        },
        details: lorem,
    },
]

const ViewTransportationSchedulesView = () => {
    const pageCount = Math.ceil(schedules.length / 2);
    const [page, setPage] = useState(1);

    const handlePageChange = (e, p) => {
        setPage(p);
    }

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
                                View Schedules
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
                                            Add Schedule
                                        </Button>
                                    </Stack>
                                </Card>
                                <Stack spacing={2} sx={{
                                    width: "fit-content",
                                    flexGrow: 1,
                                    maxHeight: "auto"
                                }}>
                                    <Box sx={{
                                        flexGrow: 1,
                                        flexBasis: 0,
                                        maxHeight: "auto",
                                    }}>
                                        <ScheduleCard schedule={schedules[page * 2 - 2]}/>
                                    </Box>
                                    <Box sx={{
                                        flexGrow: 1,
                                        flexBasis: 0,
                                        maxHeight: "auto",
                                    }}>
                                        {
                                            page * 2 <= schedules.length
                                            && <ScheduleCard schedule={schedules[page * 2 - 1]}/>
                                        }
                                    </Box>
                                </Stack>
                                <Pagination
                                    count={pageCount}
                                    color="primary"
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </Stack>
                            <Box sx={{
                                // width: "100%",
                                // width: 600,
                                flexGrow: 1,
                                maxWidth: "auto",
                                // height: 320,
                                // height: "100%",
                                bgcolor: "#dddddd",
                                // position: "sticky",
                                // top: 88,
                                zIndex: -1
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

const ViewTransportationSchedulesPage = () => {
    return (
        <DashboardLayout>
            <ViewTransportationSchedulesView />
        </DashboardLayout>
    )
};

export default ViewTransportationSchedulesPage;