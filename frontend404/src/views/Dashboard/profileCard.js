import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProfileCard = ({profile}) => {
    return <Paper sx={{
        padding: 2,
        height: "40vh"
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
        }}>
            <Box style={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
            }}>
                <img src={profile.image} style={{
                    width: "100%"
                }} />
                <Box marginTop="auto">
                    <Button>
                        Update Profile
                    </Button>
                </Box>
            </Box>
            <Box marginLeft={3}>
                <Typography variant="h5" component="h2">
                    {profile.name}
                </Typography>
                <Typography marginTop={1} variant="body1" component="h3">
                    {profile.role}
                </Typography>
                <Typography marginTop={1} variant="body2" component="h3">
                    {profile.phoneNumber}
                </Typography>
                <Typography marginTop={1} variant="body2" component="h3">
                    {profile.email}
                </Typography>
                <Typography marginTop={1} variant="body2" component="h3">
                    Born on {profile.birthDate}
                </Typography>
                <Typography marginTop={1} variant="body2" component="h3">
                    Joined on {profile.joinDate}
                </Typography>
            </Box>
        </Box>
    </Paper>
};

export default ProfileCard;