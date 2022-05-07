import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useState } from 'react';

const ScheduleCard = () => {
    return (
        <Card
            sx={{
                p: 2
            }}
        >
            <Box width={800} height={192}/>
        </Card>
    )
}

export default ScheduleCard;