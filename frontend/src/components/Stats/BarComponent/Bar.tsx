import { FC } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarProps } from './Bar.model';
import '../stats.scss';

const PieComponent: FC<BarProps> = ({ data }) => (
  <BarChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar barSize={5} dataKey="train" fill="#6F52ED" />
    <Bar barSize={5} dataKey="new" fill="#FF7A00" />
  </BarChart>
);
export default PieComponent;
