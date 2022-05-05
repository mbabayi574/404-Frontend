import { theme } from '../../theme';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const AddTransportationScheduleView = () => {
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
                    // height: 880,
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

                        <Stack spacing={4}
                            sx={{
                                flexGrow: 1,
                                height: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{
                                width: '100%',
                                // height: 320,
                                height: 480,
                                bgcolor: '#dddddd',
                                position: 'sticky',
                                top: 88,
                                zIndex: -1
                            }}>
                                Map Embed
                            </Box>
                            <Card sx={{
                                [theme.breakpoints.down('md')]: {
                                    width: 600
                                },
                                [theme.breakpoints.up('md')]: {
                                    width: 800
                                },
                                height: 720
                            }}>

                            </Card>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    )
};

const AddTransportationSchedulePage = () => {
    return (
        <DashboardLayout>
            <AddTransportationScheduleView />
        </DashboardLayout>
    )
};

export default AddTransportationSchedulePage;