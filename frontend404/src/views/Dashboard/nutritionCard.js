import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const lunch = "Kebab";
const dinner = "Spaghetti";

const NutritionCard = () => {
    return <Paper sx={{
        padding: 2,
    }}>
        <Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="h5" component="h1" fontWeight="bolder">
                    Nutrition
                </Typography>
                <Button variant="contained" sx={{marginLeft: "auto"}}>
                    Reserve
                </Button>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginTop={1}
            >
                <Typography variant="body1" component="h2">
                    Lunch: {lunch}
                </Typography>
                <Typography variant="body1" component="h3">
                    Dinner: {dinner}
                </Typography>
            </Box>
        </Box>
    </Paper>;
};

export default NutritionCard;