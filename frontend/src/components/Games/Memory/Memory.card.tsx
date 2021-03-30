import React, { FC } from 'react';
import { MemoryCardProps } from './Memory.model';

const MemoryCard: FC<MemoryCardProps> = (props) => {
  const { word, textMeaning } = props;
  return (
    <div className="column card selected is-one-fifth">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{word}</p>
            <p className="subtitle is-6">{textMeaning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
