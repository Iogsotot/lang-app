import { FC } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { GetReadyProps } from './GetReady.model';

import { SPRINT_GET_READY } from '../../../../constants';

import './GetReady.scss';

const { title, timerColor, timerSize, timerStrokeWidth, timerDuration } = SPRINT_GET_READY;

const GetReady: FC<GetReadyProps> = ({ isPlaying, onComplete }) => (
  <div className="get-ready">
    <h2 className="title">{title}</h2>
    <CountdownCircleTimer
      onComplete={onComplete}
      size={timerSize}
      strokeWidth={timerStrokeWidth}
      isPlaying={isPlaying}
      duration={timerDuration}
      colors={timerColor}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  </div>
);

export default GetReady;
