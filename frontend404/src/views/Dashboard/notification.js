import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Notification = () => {
    const title = "Title";
    const context = "this is a notification.";
    const today = new Date();
    const date = (today.getUTCMonth() + 1) + '/' + today.getDate();
    return <Paper sx={{
        padding: 2
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Typography variant="body1" component="h2">
                {title}
            </Typography>
            <Typography variant="body2" component="h3" marginLeft="auto">
                {date}
            </Typography>
        </Box>
    </Paper>
};

export default Notification;