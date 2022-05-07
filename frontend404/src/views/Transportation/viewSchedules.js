// design #1

import { theme } from '../../theme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Search from '@mui/icons-material/Search';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import ScheduleCard from '../../components/transportation/scheduleCard';
import mapPlaceholder from '../../images/map-placeholder-1.png';

const ViewTransportationSchedulesView = () => {   
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
                    height: '100%',
                }}>
                    <Stack spacing={3} sx={{height: '100%', width: '100%'}}>
                        <Box>
                            <Typography
                                variant="h4"
                            >
                                Add New Schedule
                            </Typography>
                        </Box>

                        <Stack spacing={4} direction='row'
                            sx={{
                                flexGrow: 1,
                                height: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <Stack spacing={3} sx={{
                                height: '100%',
                                alignItems: 'center'
                            }}>
                                <Stack spacing={2} sx={{
                                    width: 'fit-content',
                                    flexGrow: 1,
                                    maxHeight: 'auto'
                                }}>
                                    <ScheduleCard />
                                    <ScheduleCard />
                                    <ScheduleCard />
                                </Stack>
                                <Pagination count={10} color='primary'/>
                            </Stack>
                            <Box sx={{
                                // width: '100%',
                                // width: 600,
                                flexGrow: 1,
                                maxWidth: 'auto',
                                // height: 320,
                                // height: '100%',
                                bgcolor: '#dddddd',
                                // position: 'sticky',
                                // top: 88,
                                zIndex: -1
                            }}>
                                <img
                                    styles={{width: '100%', height: '100%'}}
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