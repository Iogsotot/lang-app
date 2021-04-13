import { FC } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { PieProps } from './Pie.model';
import '../stats.scss';

const PieComponent: FC<PieProps> = ({ data }) => {
  const COLORS = ['#6F52ED', '#FFB800', '#FF4C61', '#33D69F'];

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <div className="box stats__box">
        <span>Изученые слова </span>
        <PieComponent data={data} />
      </div>
      <Legend verticalAlign="bottom" layout="vertical" iconType="circle" iconSize={8} />
    </PieChart>
  );
};
export default PieComponent;
