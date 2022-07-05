import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const FinancialStatisticsChart = (props) => {
  const { statistics } = props;

  return (
    <ResponsiveContainer width="75%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={statistics}
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
  );
};

export default FinancialStatisticsChart;