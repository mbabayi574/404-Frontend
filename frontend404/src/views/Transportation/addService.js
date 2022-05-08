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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Search from '@mui/icons-material/Search';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import mapPlaceholder from '../../images/map-placeholder-2.png';

const AddTransportationServiceView = () => {
    const [capacity, setCapacity] = useState(0);
    const [arrivalTime, setArrivalTime] = useState({hour: 0, minute: 0});
    const [returnTime, setReturnTime] = useState({hour: 0, minute: 0});
    const [workingDays, setWorkingDays] = useState({
        'Sat': false,
        'Sun': false,
        'Mon': false,
        'Teu': false,
        'Wed': false,
        'Thu': false,
        'Fri': false
    })

    const handleCapacityChange = (e) => {
        setCapacity(e.target.value);
    };

    const handleArrivalHourChange = (e) => {
        setArrivalTime({...arrivalTime, hour: e.target.value});
    };
    const handleArrivalMinuteChange = (e) => {
        setArrivalTime({...arrivalTime, minute: e.target.value});
    };
    const handleReturnHourChange = (e) => {
        setReturnTime({...returnTime, hour: e.target.value});
    };
    const handleReturnMinuteChange = (e) => {
        setReturnTime({...returnTime, minute: e.target.value});
    };
    
    const handleWorkingDaysChange = (e) => {
        let newWorkingDays = { ...workingDays };
        newWorkingDays[e.target.value] = e.target.checked;
        setWorkingDays(newWorkingDays);
    }

    const clearWorkingDays = (e) => {
        setWorkingDays({
            'Sat': false,
            'Sun': false,
            'Mon': false,
            'Teu': false,
            'Wed': false,
            'Thu': false,
            'Fri': false
        });
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
                    // height: 880,
                    height: '100%',
                }}>
                    <Stack spacing={3} sx={{height: '100%', width: '100%'}}>
                        <Box>
                            <Typography
                                variant="h4"
                            >
                                Add New Service
                            </Typography>
                        </Box>

                        <Stack spacing={4} direction='row'
                            sx={{
                                flexGrow: 1,
                                height: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <Card sx={{
                                // [theme.breakpoints.down('md')]: {
                                //     width: 600
                                // },
                                // [theme.breakpoints.up('md')]: {
                                //     width: 800
                                // },
                                width: 'fit-content',
                                height: 'fit-content'
                            }}>
                                <Typography
                                    variant="h5"
                                    sx={{p: 2}}
                                >
                                    Service Info
                                </Typography>
                                <Divider />
                                <Stack spacing={2} sx={{p: 3}}>
                                    <Stack spacing={2} direction='row'>
                                        <TextField required label='Address' sx={{flexGrow: 1, maxWidth: 'auto'}}/>
                                        <Button variant='outlined' startIcon={<Search />}>Find Location</Button>
                                    </Stack>
                                    {/* <TextField
                                        label='Capacity'
                                        select
                                        fullWidth
                                        value={capacity}
                                        onChange={handleCapacityChange}
                                        SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } }}}
                                        // MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                    >
                                        {[...Array(100).keys()].map(n =>
                                            <MenuItem value={n + 1}>{n + 1}</MenuItem>
                                        )}
                                    </TextField> */}
                                    <TextField 
                                        type="number"
                                        value={capacity}
                                        onChange={handleCapacityChange}
                                        InputProps={{
                                            inputProps: { 
                                                min: 0
                                            }
                                        }}
                                        label="Capacity"
                                    />
                                    <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                                        <Typography
                                            variant='h6'
                                            sx={{flexGrow: 1}}
                                        >
                                            Arrival Time
                                        </Typography>
                                        <TextField
                                            label='Hour'
                                            select
                                            sx={{flexGrow: 1}}
                                            value={arrivalTime.hour}
                                            onChange={handleArrivalHourChange}
                                            SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } }}}
                                        >
                                            {[...Array(24).keys()].map(n =>
                                                <MenuItem value={n}>{n}</MenuItem>
                                            )}
                                        </TextField>
                                        <TextField
                                            label='Minute'
                                            select
                                            sx={{flexGrow: 1}}
                                            value={arrivalTime.minute}
                                            onChange={handleArrivalMinuteChange}
                                            SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } }}}
                                        >
                                            {[...Array(60).keys()].map(n =>
                                                <MenuItem value={n}>{n}</MenuItem>
                                            )}
                                        </TextField>
                                    </Stack>
                                    <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                                        <Typography
                                            variant='h6'
                                            sx={{flexGrow: 1}}
                                        >
                                            Return Time
                                        </Typography>
                                        <TextField
                                            label='Hour'
                                            select
                                            sx={{flexGrow: 1}}
                                            value={returnTime.hour}
                                            onChange={handleReturnHourChange}
                                            SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } }}}
                                        >
                                            {[...Array(24).keys()].map(n =>
                                                <MenuItem value={n}>{n}</MenuItem>
                                            )}
                                        </TextField>
                                        <TextField
                                            label='Minute'
                                            select
                                            sx={{flexGrow: 1}}
                                            value={returnTime.minute}
                                            onChange={handleReturnMinuteChange}
                                            SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } }}}
                                        >
                                            {[...Array(60).keys()].map(n =>
                                                <MenuItem value={n}>{n}</MenuItem>
                                            )}
                                        </TextField>
                                    </Stack>
                                    <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                                        <Typography
                                            variant='h6'
                                            sx={{flexGrow: 1, maxWidth: 'fit-content'}}
                                        >
                                            Working Days
                                        </Typography>
                                        {['Sat', 'Sun', 'Mon', 'Teu', 'Wed', 'Thu', 'Fri'].map(day => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={day}
                                                value={day}
                                                checked={workingDays[day]}
                                                onChange={handleWorkingDaysChange}
                                            />
                                        ))}
                                        <Button onClick={clearWorkingDays} variant='text'>
                                            Clear All
                                        </Button>
                                    </Stack>
                                    <TextField label='Details' fullWidth multiline rows={7}/>
                                    <Stack spacing={2} direction='row' sx={{justifyContent: 'flex-end'}}>
                                        <Button variant='outlined'>
                                            Cancel
                                        </Button>
                                        <Button variant='contained'>
                                            Add
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Card>
                            <Box sx={{
                                // width: '100%',
                                // width: 600,
                                flexGrow: 1,
                                maxWidth: 'auto',
                                // height: 320,
                                height: '100%',
                                bgcolor: '#dddddd',
                                // position: 'sticky',
                                // top: 88,
                                zIndex: -1
                            }}>
                                <img
                                    // styles={{width: 'auto', height: 'auto'}}
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

const AddTransportationServicePage = () => {
    return (
        <DashboardLayout>
            <AddTransportationServiceView />
        </DashboardLayout>
    )
};

export default AddTransportationServicePage;