import { FC, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import PieComponent from './PieComponent';
import BarComponent from './BarComponent';
import './stats.scss';
import { API_BASE_URL } from '../../constants';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Stats: FC = () => {
  const data = [
    { name: 'Спринт', value: 20 },
    { name: 'Саванна', value: 20 },
    { name: 'Паззл', value: 15 },
    { name: 'Аудиовызов', value: 7 },
  ];
  const [puzzle, setPuzzle] = useState(0);
  const [savannah, setSavannah] = useState(0);
  const [sprint, setSprint] = useState(0);
  const [audiocall, setAudiocall] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [sprintCorrectAnswers, setSprintCorrectAnswers] = useState(0);

  const store = useTypedSelector(commonStore => commonStore);
  const { userId, token } = store.user.user;
  useEffect(() => {
    fetch(`${API_BASE_URL}/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json()).then(res => {
      setTotalWords(res.learnedWords);
      let correctAnswersCount = 0;
      let wrongAnswersCount = 0;
      Object.keys(res.optional).forEach(el => {
        Object.keys(res.optional[el]).forEach(elem => {
          correctAnswersCount += res.optional[el][elem].correctAnswers;
          wrongAnswersCount += res.optional[el][elem].wrongAnswers;
        });
      });
      setTotalWords(correctAnswersCount + wrongAnswersCount);
      setCorrectAnswers(correctAnswersCount);
      setWrongAnswers(wrongAnswersCount);
    });
  }, []);
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
        <div className="box stats__box resume-box">
          <h4>Изученных слов</h4> <span className="stats__result">{totalWords}</span>
        </div>
        <div className="box stats__box resume-box">
          <h4>Правильных ответов</h4> <span className="stats__result">{correctAnswers / totalWords}%</span>
        </div>
      </div>
      <div className="stats__block">
        <div className="box stats__box pie-box">
          <h4>Прогресс изучения слов в играх</h4>
          <PieComponent data={data} />
        </div>
        <div className="box stats__box pie-box">
          <h4>Самая длинная серия правильных ответов </h4>
          <PieComponent data={data} />
        </div>
      </div>
      <div className="stats__block">
        <div className="box stats__box progress-box">
          <h2>83%</h2>
          <span>Правильных ответов в игре Спринт </span>
        </div>
        <div className="box stats__box progress-box">
          <h2>83%</h2>
          <span>Правильных ответов в игре Саванна </span>
        </div>
        <div className="box stats__box progress-box">
          <h2>83%</h2>
          <span>Правильных ответов в игре Паззл </span>
        </div>
        <div className="box stats__box progress-box">
          <h2>83%</h2>
          <span>Правильных ответов в игре Аудиовызов </span>
        </div>
      </div>
      <h2>Прогресс</h2>
      <div className="stats__block">
        <div className="box stats__box bar-box">
          <BarComponent data={daysData} />
        </div>
      </div>
    </div>
  );
};
export default Stats;
