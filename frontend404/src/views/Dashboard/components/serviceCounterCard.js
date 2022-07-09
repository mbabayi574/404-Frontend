import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useAPI from 'useAPI';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DashboardServiceCounterCard = () => {
  const api = useAPI();
  const navigate = useNavigate();
  const [numberOfRequests, setNumberOfRequests] = useState(0);
  const [numberOfRecentRequests, setNumberOfRecentRequests] = useState(0);

  useEffect(() => {
    getRequestsData();
  }, []);

  const getRequestsData = () => {
    // api({
    //   url: "ServiceCounter/get_pending_requests"
    // }).then(setRequestData);
  }

  const setRequestData = (reponse) => {
    const requests = reponse.data.results;
    const recentRequests = requests.filter(isRequestRecent);
    setNumberOfRequests(requests.length);
    setNumberOfRecentRequests(recentRequests.length);
  }

  const isRequestRecent = (request) => {
    const today = new Date();
    const requestDate = new Date(request.date);
    const difference = (today - requestDate);
    const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    return differenceInDays < 3;
  }

  const getRequestsText = () => {
    switch (numberOfRequests) {
      case 0:
        return "No request is pending!";
      case 1:
        return "One request is pending.";
      default:
        return `${numberOfRequests} requests are pending.`;
    }
  }

  const getRecentRequestsText = () => {
    switch (numberOfRequests) {
      case 0:
        return "";
      case 1:
        if (numberOfRecentRequests === 1) {
          return "It has been recently made.";
        } else {
          return "";
        }
      default:
        if (numberOfRecentRequests === 1) {
          return "One of them is recently made.";
        } else if (numberOfRecentRequests === numberOfRequests) {
          return "All of them are recently made!";
        } else {
          return `${numberOfRequests} of them are recently made.`;
        }
    }
  }

  return (
    <Card sx={{
      padding: 2,
      height: "100%",
    }}>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          component="h1"
          textAlign="start"
        >
          Service Counter
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          component="p"
          textAlign="start"
        >
          {getRequestsText()}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          textAlign="start"
        >
          {getRecentRequestsText()}
        </Typography>
        <Stack
          direction="row"
          justifyContent="end"
        >
          <Button onClick={() => navigate("/my/servicecounter")}>
            Manage requests
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DashboardServiceCounterCard;