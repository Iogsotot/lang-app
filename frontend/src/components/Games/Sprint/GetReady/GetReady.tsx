import { FC } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { GetReadyProps } from './GetReady.model';

import './GetReady.scss';

const GetReady:FC <GetReadyProps> = ({ isPlaying, onComplete }) => (
  <div className="get-ready">
    <h2 className="title">Get Ready</h2>
    <CountdownCircleTimer
      onComplete={onComplete}
      size={80}
      strokeWidth={3}
      isPlaying={isPlaying}
      duration={5}
      colors={'#00d1b2'}>
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  </div>
);

export default GetReady;
