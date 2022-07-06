import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import useAPI from "useAPI";


const DashboardTimeTrackerCard = () => {
  const api = useAPI();
  const [data, setData] = useState([]);
  const [workHours, setWorkHours] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);

  const getTimeTrackerData = () => {
    api({
      url: "tracker/me/"
    }).then(setTimeTrackerData);
  }

  useEffect(() => {
    getTimeTrackerData();
  }, []);

  const setTimeTrackerData = (response) => {
    const times = response.data;
    const today = new Date();
    const previousWeek = new Date(new Date().setDate(today.getDate() - 7));
    let tempData = [];
    console.log(today);
    for (let date = new Date(previousWeek);
      date.valueOf() <= today.valueOf();
      date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const effectiveTime = getEffectiveTime(times, date);
      tempData.push({
        day: dayOfWeek.slice(0, 3),
        effectiveTime: (effectiveTime / 60),
      });
    }
    setData(tempData);
    const todayEffectiveTime = getEffectiveTime(times, today);
    setWorkHours(Math.floor(todayEffectiveTime / 60));
    setWorkMinutes(todayEffectiveTime % 60);
  }

  const getEffectiveTime = (times, date) => {
    const filtered = times.filter(item => {
      const itemDate = new Date(item.date);
      console.log(itemDate);
      return areSameDay(itemDate, date);
    });
    console.log(filtered.length);
    const hours = filtered.map(item => {
      console.log(item.end_point);
      const endTime = getDatetimeFromTime(date, item.end_point);
      const startTime = getDatetimeFromTime(date, item.start_point);
      console.log(endTime);
      const difference = Math.ceil((endTime - startTime) / (60 * 1000));

      return difference - item.wasted_time;
    });
    const total = hours.reduce((a, b) => a + b, 0);
    return total;
  };

  const getDatetimeFromTime = (date, time) => {
    const [hours, minutes, seconds] = time.split(":");
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day, hours, minutes, seconds);
  };

  const areSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  return (
    <Card sx={{
      p: 2
    }}>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          component="h1"
          textAlign="start"
        >
          Time Tracker Report
        </Typography>
        <Divider />
        <Stack
          direction="row"
        >
          <BarChart width={400} height={200} data={data}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Bar dataKey="effectiveTime" fill="#8884d8" barSize={15} />
          </BarChart>
          <Stack
            pt={1}
            marginLeft="auto"
            alignItems="end"
          >
            <Typography
              variant="body1"
              component="p"
              sx={{
                flexGrow: 1
              }}
            >
              You have submitted {workHours} hours and {workMinutes} minutes of work today.
            </Typography>
            <Button sx={{
              mt: "auto"
            }}>
              Manage Time Tracker
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DashboardTimeTrackerCard;