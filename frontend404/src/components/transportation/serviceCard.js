import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

const ServiceCard = (props) => {
    // const address = 'Tehran, Iran University of Science and Technology, Computer Engineering Department';
    // const arrivalTime = {hour: 7, minute: 0};
    // const returnTime = {hour: 16, minute: 30};
    // const capacity = 250;
    // const days = {
    //     'Sat': true,
    //     'Sun': true,
    //     'Mon': true,
    //     'Teu': true,
    //     'Wed': true,
    //     'Thu': false,
    //     'Fri': false
    // };
    // const details = '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    // const {service} = props;
    console.log(props)
    const {address, arrivalTime, returnTime, capacity, days, details} = props.service;
    
    const formatTime = (time) => {
        return time.hour.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        }) + ':' + time.minute.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    }
    return (
        <Card
            sx={{
                // flexGrow: 1,
                // maxHeight: 'auto',
                p: 2,
                height: '100%'
            }}
        >
            <Stack width={800} height='100%' spacing={2}>
                <Stack direction='row' spacing={3} sx={{p: 0.5, alignItems: 'center'}}>
                    <LocationOnIcon fontSize='large' />
                    <Typography variant='h6' sx={{flexGrow: 1, maxWidth: 'auto'}}>
                        {address}
                    </Typography>
                    <Stack spacing={0.5} sx={{alignItems: 'center'}}>
                        <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
                            <AccessTimeIcon fontSize='small' />
                            <Typography variant='body1' sx={{width: 'max-content'}}>
                                {formatTime(arrivalTime)} - {formatTime(returnTime)}
                            </Typography>
                        </Stack>
                        <Stack direction='row' spacing={0.5}>
                            {['Sat', 'Sun', 'Mon', 'Teu', 'Wed', 'Thu', 'Fri'].map((day) => (
                                <Tooltip title={day}>
                                    <CircleIcon sx={{fontSize: '14px'}} color={days[day] ? 'primary' : 'disabled'} />
                                </Tooltip>
                            ))}
                        </Stack>
                    </Stack>
                    <Typography variant='h6' sx={{flexShrink: 0, width: 120, textAlign: 'end'}}>
                        {capacity === 0 ? 'No': capacity} Seats Left
                    </Typography>
                </Stack>
                <Divider />
                <Typography variant='body1' sx={{flexGrow: 1, maxHeight: 'auto'}}>
                    {details}
                </Typography>
                <Divider />
                <Stack direction='row' spacing={2} justifyContent='flex-end'>
                    <Button variant='outlined' startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button variant='contained'>
                        Manage Seats
                    </Button>
                </Stack>
            </Stack>
        </Card>
    )
}

export default ServiceCard;