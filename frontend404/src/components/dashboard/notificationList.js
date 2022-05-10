import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Notification from './notification';

const notifications = [
    {title: "very long title which shows multiline titles are supported", date: "4-20"},
    {title: "Title", date: "4-20"},
    {title: "Title", date: "4-20"},
    {title: "Title", date: "4-20"},
    {title: "Title", date: "4-20"},
]

const NotificationList = () => {
    return <Card sx={{
        padding: 2,
        height: "100%"
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Typography variant="h5" component="h1" fontWeight="bolder">
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
    </Card>
};

export default NotificationList;