import { FC, useEffect, useRef, useState } from 'react';

import { TimerProps } from './Timer.model';

import { timerConsts } from '../constants';

import './Timer.scss';

const { emptyColor, filledColor } = timerConsts;

const Timer:FC<TimerProps> = ({ duration }) => {
  const timerRef = useRef<SVGCircleElement>(null);
  const [time, setTimer] = useState(duration);
  const start = Date.now();
  let interval: NodeJS.Timer;
  useEffect(() => {
    timerRef.current?.animate([
      { strokeDashoffset: 0 },
    ],
    {
      duration: duration * 1000,
      iterations: 1,
    });
    interval = setInterval(() => {
      const timeLast = Math.ceil(duration - ((Date.now() - start) / 1000));
      setTimer(timeLast >= 0 ? timeLast : 0);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <svg className="timer" width="80" height="80">
    <circle
      className="timer__circle"
      cx="40"
      cy="40"
      r="37"
      stroke={time !== 0 ? emptyColor : filledColor}
      strokeWidth="3"
      fill="none" />
    <circle
      ref={timerRef}
      className="timer__path"
      cx="-40"
      cy="40"
      r="37"
      stroke={filledColor}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <text x="50%" y="50%" textAnchor="middle" stroke={filledColor} strokeWidth="1px" dy=".3em">
      {time}
    </text>
  </svg>;
};

export default Timer;
