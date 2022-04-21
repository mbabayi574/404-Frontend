import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import RequestOverviewCard from './requestOverviewCard';
const requests = [
    {
        title: "This is a dummy title to showcase details of a request",
        description: "This is a dummy description to showcase details of a request",
        requester: "Diyar Hamedi",
        date: "05-27",
    },
    {
        title: "This is a dummy title to showcase details of a request",
        description: "This is a dummy description to showcase details of a request",
        requester: "Diyar Hamedi",
        date: "05-27",
    },
    {
        title: "This is a dummy title to showcase details of a request",
        description: "This is a dummy description to showcase details of a request",
        requester: "Diyar Hamedi",
        date: "05-27",
    },
    {
        title: "This is a dummy title to showcase details of a request",
        description: "This is a dummy description to showcase details of a request",
        requester: "Diyar Hamedi",
        date: "05-27",
    },
];

const ServiceCounterCard = () => {
    const [data, setData] = React.useState(requests);
    return (
      <Paper sx={{
        padding: 2,
        height: "100%",
      }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h5" component="h1">
            <Box fontWeight="bolder">
              Service Counter
            </Box>
          </Typography>
          <Box marginLeft="auto">
            <Button>
                View All
            </Button>
          </Box>
        </Box>
        <Grid container spacing={1} marginTop={0.5} sx={{
            height: "27vh",
            overflowY: "auto"
        }}>
            {
                data.map(({title, description, requester, date}) => {
                    return (
                        <Grid item xs={6}>
                            <RequestOverviewCard
                                title={title}
                                description={description}
                                requester={requester}
                                date={date}
                            />
                        </Grid>
                    );
                })
            }
        </Grid>
      </Paper>
    );
};

export default ServiceCounterCard;