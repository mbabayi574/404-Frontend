import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Notification from './notification';

const NotificationList = ({notifications}) => {
    return <Paper sx={{
        padding: 2
    }}>
        <Typography variant="h5" component="h1">
            Notifications
        </Typography>
        <Stack marginTop={1} spacing={0.5}>
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