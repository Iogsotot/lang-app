import { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { StreakProps } from './Streak.model';

import './Streak.scss';

const Streak: FC<StreakProps> = ({ streak, isModMax, maxStreak }) => {
  const streaks = new Array(!isModMax ? maxStreak : 1).fill(0).map((_, index) => (
    <div
      key={uuidv4()}
      className={`streak__circle ${index < streak || isModMax ? 'streak__circle-filled' : 'streak__circle-empty'}`}
    >
      <i className="fas fa-check" />
    </div>
  ));
  return <div className="streak">{streaks}</div>;
};

export default Streak;
