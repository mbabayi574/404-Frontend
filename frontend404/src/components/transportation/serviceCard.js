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
    const {
        id,
        address,
        arrival_time,
        Return_time,
        maximum_capacity,
        details,
        saturday,
        sunday,
        monday,
        tuesday,
        wedensday,
        thursday,
        friday,
        ...others} = props.service;
    
    const days = {
        'Sat': saturday,
        'Sun': sunday,
        'Mon': monday,
        'Tue': tuesday,
        'Wed': wedensday,
        'Thu': thursday,
        'Fri': friday,
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
                                {arrival_time.slice(0, -3)} - {Return_time.slice(0, -3)}
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
                        {maximum_capacity === 0 ? 'No': maximum_capacity} Seats Left
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