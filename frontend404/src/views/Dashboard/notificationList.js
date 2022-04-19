import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Notification from './notification';

const NotificationList = ({notifications}) => {
    return <Paper sx={{
        padding: 2,
        height: "100%"
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Typography variant="h5" component="h1">
                Notifications
            </Typography>
            <Box marginLeft="auto">
                <Button>
                    View all
                </Button>
            </Box>
        </Box>
        <Stack marginTop={1} spacing={0.5} style={{
            flexGrow: 1,
            maxHeight: "100%",
            overflow: "auto"
        }}>
        {
            notifications.map(({title, date}) => {
                return (
                    <Item>
                        <Notification title={title} date={date}/>
                    </Item>
                );
            })
        }
        </Stack>
    </Paper>
};

export default NotificationList;