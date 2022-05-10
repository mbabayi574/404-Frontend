import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Notification = ({title, date}) => {
    return <Paper sx={{
        padding: 1
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