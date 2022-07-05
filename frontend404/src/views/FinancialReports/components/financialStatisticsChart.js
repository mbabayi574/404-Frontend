import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const FinancialStatisticsChart = (props) => {
  const gainColor = '#14B8A6';
  const gainColorArea = '#43C6B7';
  const lossColor = '#D14343';
  const lossColorArea = '#DA6868';

  const { statistics } = props;
  const maxTotalRevenue = Math.max(...statistics.map(item => item.total_revenue));
  const minTotalRevenue = Math.min(...statistics.map(item => item.total_revenue));
  const totalRevenueRange = maxTotalRevenue - minTotalRevenue;
  const percentage = (maxTotalRevenue / totalRevenueRange) * 100;
  const areaChartGradient = (
    <linearGradient id="gradient" x1="0" y1="0" x2="0%" y2="100%">
      <stop offset="0%" stopColor={gainColorArea} />
      <stop offset={`${percentage}%`} stopColor={gainColorArea} />
      <stop offset={`${percentage}%`} stopColor={lossColorArea} />
      <stop offset="100%" stopColor={lossColorArea} />
    </linearGradient>
  );

  return (
    <ResponsiveContainer width="75%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={statistics}
        baseValue="0"
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <defs>
          {areaChartGradient}
        </defs>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar name="Revenue" dataKey="revenue" barSize={10}>
          {statistics.map(item => (
            <Cell
            fill={(item.revenue >= 0) ? gainColor : lossColor}
            />
          ))}
        </Bar>
        <Area
          name="Total Revenue"
          type="monotone"
          dataKey="total_revenue"
          fill="url(#gradient)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default FinancialStatisticsChart;