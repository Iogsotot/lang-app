import React, { FC, useState } from 'react';
import { MemoryCardProps } from './Memory.model';

const MemoryCard: FC<MemoryCardProps> = (props) => {
  // const [selected, setSelected] = useState(false);
  const { word, textMeaning, onSelection, selected, won, id } = props;
  return (
    <div className={`column card ${selected ? 'selected' : ''} is-one-fifth`}
      onClick={onSelection}
      id={id}
    >
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
