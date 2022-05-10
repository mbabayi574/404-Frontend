import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RequestOverviewCard = ({title, requester, date}) => {
    return (
        <Paper variant="outlined" sx={{
            padding: 1,
            maxWidth: "100%",
            backgroundColor: "#f9f6f6"
        }}>
            <Box>
                <Typography height="7vh" variant="body1" component="h2" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Box display="flex" flexDirection="row">
                    <Box display="flex" flexDirection="column">
                        <Typography variant="body2" component="h3">
                            {requester}
                        </Typography>
                        <Typography variant="body2" component="h4">
                            {date}
                        </Typography>
                    </Box>
                    <Box marginLeft="auto">
                        <Button>
                            View
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
};

export default RequestOverviewCard;