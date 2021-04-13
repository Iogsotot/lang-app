import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarProps } from './Bar.model';
import '../stats.scss';

const PieComponent: FC<BarProps> = ({ data }) => (
  <ResponsiveContainer>
    <BarChart
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
      <Legend iconType="circle" iconSize={8} />
      <Bar barSize={6} name="Изучено слов за день" dataKey="train" fill="#6F52ED" />
      <Bar barSize={6} name="Изучено новых слов за день" dataKey="new" fill="#FF7A00" />
    </BarChart>
  </ResponsiveContainer>
);
export default PieComponent;
