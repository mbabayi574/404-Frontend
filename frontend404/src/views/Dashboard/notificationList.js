import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Notification from './notification';

const NotificationList = () => {
    return <Paper sx={{
        padding: 2
    }}>
        <Typography variant="h5" component="h1">
            Notifications
        </Typography>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
    </Paper>
};

export default NotificationList;