import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useReportData } from "../dummy-data";
import FinancialStatisticsDataSelection from "./financialStatisticsDataSelection";
import FinancialStatisticsChart from "./financialStatisticsChart";

const FinancialStatisticsSection = () => {
  const { reportData, getReportData } = useReportData();

  const getDateDiffInDays = (range) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const startDate = range.startDate;
    const endDate = range.endDate;

    const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const getPresicion = (range) => {
    const dateDifference = getDateDiffInDays(range);
    if (dateDifference <= 30) {
      return "daily";
    } else if (dateDifference <= 200) {
      return "weekly";
    } else if (dateDifference <= 1000) {
      return "monthly";
    } else {
      return "annual";
    }
  }

  const getStatistics = (range) => {
    const precision = getPresicion(range);
    getReportData(range.startDate, range.endDate, precision);
  }

  useEffect(() => {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(0);
    const endDate = new Date();

    getStatistics({
      startDate: startDate,
      endDate: endDate,
    })
  }, []);

  return (
    <Card sx={{
      width: "100%",
      height: "fit-content",
      p: 2,
    }}>
      <Box sx={{
        width: "100%",
        height: "71vh",
        display: "flex"
      }}>
        <FinancialStatisticsDataSelection
          getStatistics={getStatistics}
        />
        <FinancialStatisticsChart
          statistics={reportData}
        />
      </Box>
    </Card>
  )
};

export default FinancialStatisticsSection;