import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";


const time={hours: 2, minutes: 18}
const expected={hours: 8, minutes: 0}

const TimeTrackerCard = () => {
    const [running, setRunning] = useState(false);
    const handleToggle = () => {
        setRunning(!running);
    }
    const getProgressValue = (time, expected) => {
        return (time.hours * 60.0 + time.minutes) / (expected.hours * 60.0 + time.minutes) * 100.0;
    }
    return <Card sx={{
        padding: 2,
    }}>
        <Box>
            <Box style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography variant="h5" component="h1" fontWeight="bolder">
                    Time Tracker
                </Typography>
                <Typography variant="body1" component="h3">
                    {time.hours}h {time.minutes}mins
                </Typography>
                <Button variant="contained" onClick={handleToggle}>
                    {running ? "Stop" : "Start"}
                </Button>
            </Box>
            <Box marginTop={2}>
                <LinearProgress variant="determinate" value={getProgressValue(time, expected)} />
            </Box>
        </Box>
    </Card>;
};

export default TimeTrackerCard;