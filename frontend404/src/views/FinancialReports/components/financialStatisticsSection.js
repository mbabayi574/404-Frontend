import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer
} from "recharts";
import { useReportData } from "../dummy-data";

const FinancialStatisticsSection = () => {
  const { reportData, getReportData } = useReportData();

  useEffect(() => {
    const startDate = new Date("2022/1/1");
    const endDate = new Date();
    const precision = "weekly";
    console.log("start: " + startDate.toDateString());
    console.log("end: " + endDate.toDateString());
    getReportData(startDate, endDate, precision);
  }, []);

  return (
    <Card sx={{
      width: "100%",
      height: "fit-content",
      p: 1,
    }}>
      <Box sx={{
        width: "100%",
        height: "50vh",
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={reportData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="total_revenue" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="revenue" barSize={20} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
};

export default FinancialStatisticsSection;