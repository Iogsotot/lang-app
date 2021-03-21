import React, { useState, FC } from 'react';

import { shuffleArray } from '../../../libs/random';
import { WordsProps } from '../../../models';

import './style.scss';

const Sprint: FC<WordsProps> = ({ words }) => {
  const [sprintWords, setSprintWords] = useState(shuffleArray(words));
  console.log(words);
  return (
    <div className="sprint">
      <div className="box sprint__box">
        <div className="title">Word</div>
        <div className="subtitle">Перевод</div>
        <div className="buttons">
          <button className="button is-danger">Wrong</button>
          <button className="button is-success">Correct</button>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
