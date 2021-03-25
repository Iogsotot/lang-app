import { FC, useEffect, useRef, useState } from 'react';

import { TimerProps } from './Timer.model';

import { timerConsts } from '../constants';

import './Timer.scss';

const { emptyColor, filledColor } = timerConsts;

const Timer:FC<TimerProps> = ({ duration, tick, callback }) => {
  const timerRef = useRef<SVGCircleElement>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);
  const [start, setStart] = useState(Date.now());
  const time = duration - secondsElapsed;
  const clearTimerIdInterval = (id: NodeJS.Timer | undefined) => {
    if (typeof id !== 'undefined') {
      clearInterval(id);
    }
  };
  useEffect(() => setSecondsElapsed(0), []);
  useEffect(() => {
    if (!tick) {
      clearTimerIdInterval(timerId);
      return;
    }

    setStart(Date.now);
    setTimerId(
      setInterval(() => {
        setSecondsElapsed(Math.ceil((Date.now() - start) / 1000));
      }, 100),
    );
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimerIdInterval(timerId);
    };
  }, [tick]);
  useEffect(() => {
    if (timerRef.current) {
      timerRef.current.style.strokeDashoffset = String(232.48 - ((232.48 / duration) * secondsElapsed));
    }
    if (duration > secondsElapsed) {
      return;
    }
    callback();
    clearTimerIdInterval(timerId);
  }, [secondsElapsed]);

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
