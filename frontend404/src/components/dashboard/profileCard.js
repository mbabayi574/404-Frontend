import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import profileImage from "../../data/profile-image.png";

const profile = {
    image: profileImage,
    name: "Diyar Hamedi",
    company: "404! Group",
    role: "React Developer",
    birthDate: "2002-8-18",
    phoneNumber: "+98 930 454 3403",
    email: "diyar_hamedi@comp.iust.ac.ir",
    joinDate: "2022-2-23",
};

const ProfileCard = () => {
    return <Paper sx={{
        padding: 2
    }}>
        <Box style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
        }}>
            <Box display="flex" justifyContent="center">
                <img src={profile.image} style={{
                    width: "60%"
                }} />
            </Box>
            <Box display="flex" flexDirection="row" marginTop={2}>
                <Box>
                    <Typography variant="h5" component="h2">
                        {profile.name}
                    </Typography>
                </Box>
                <Box marginLeft="auto">
                    <Button>
                        Update Profile
                    </Button>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" marginTop={1}>
                <Box>
                    <Typography variant="body1" component="h3">
                        {profile.company}
                    </Typography>
                </Box>
                <Box marginLeft="auto">
                    <Typography variant="body1" component="h3">
                        {profile.role}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" marginTop={1}>
                <Box>
                    <Typography variant="body2" component="h3">
                        Joined on {profile.joinDate}
                    </Typography>
                </Box>
                <Box marginLeft="auto">
                    <Typography variant="body2" component="h3">
                        Born on {profile.birthDate}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" marginTop={1}>
                <Box>
                    <Typography variant="body2" component="h3">
                        {profile.phoneNumber}
                    </Typography>
                </Box>
                <Box marginLeft="auto">
                    <Typography variant="body2" component="h3">
                        {profile.email}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Paper>
};

export default ProfileCard;