import { FC } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import PieComponent from './PieComponent';
import BarComponent from './BarComponent';
import './stats.scss';

const Stats: FC = () => {
  const data = [
    { name: 'Спринт', value: 20 },
    { name: 'Саванна', value: 20 },
    { name: 'Паззл', value: 15 },
    { name: 'Аудиовызов', value: 7 },
  ];
  const daysData = [
    {
      date: '09/04',
      new: 5,
      train: 14,
    },
    {
      date: '10/04',
      new: 2,
      train: 10,
    },
    {
      date: '11/04',
      new: 5,
      train: 17,
    },
    {
      date: '12/04',
      new: 10,
      train: 22,
    },
    {
      date: '13/04',
      new: 7,
      train: 35,
    },
  ];

  return (
    <div className="stats">
      <h2>Сегодня</h2>
      <div className="stats__block">
        <div className="box stats__box">
          <h4>Изученных слов</h4> <span className="stats__result">54</span>
        </div>
        <div className="box stats__box">
          <h4>Правильных ответов</h4> <span className="stats__result">60%</span>
        </div>
      </div>
      <div className="stats__block">
        <div className="box stats__box">
          <h4>Изученых слов в игре </h4>
          <PieComponent data={data} />
        </div>
        <div className="box stats__box">
          <h4>Правильных ответов в игре </h4>
          <PieComponent data={data} />
        </div>
        <div className="box stats__box">
          <h4>Самая длинная серия правильных ответов </h4>
          <PieComponent data={data} />
        </div>
      </div>
      <h2>Прогресс</h2>
      <div className="stats__block">
        <div className="box stats__box bar-box">
          <BarComponent data={daysData} />
        </div>
      </div >
    </div>
  );
};
export default Stats;
