import React, { FC } from 'react';
import './style.scss';

const Sprint: FC = () => {
  console.log('eslint ***');
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
