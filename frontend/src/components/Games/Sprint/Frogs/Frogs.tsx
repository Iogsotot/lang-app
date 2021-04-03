import { FC, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { randomInteger } from '../../../../libs/random';

import { FrogsProps } from './Frogs.model';

import './Frogs.scss';

const Frogs: FC<FrogsProps> = ({ modificator, maxFrogs }) => {
  const [frogsColor] = useState(new Array(maxFrogs).fill(0).map(() => randomInteger(2)));
  return (
    <div className="frogs">
      {new Array(maxFrogs).fill(0).map((_, index) => {
        const frogIsVisible = index < modificator ? '' : 'hidden';
        let color;

        if (frogsColor[index] === 2) {
          color = 'red';
        } else if (frogsColor[index] === 1) {
          color = 'yellow';
        } else {
          color = 'green';
        }

        return <div key={uuidv4()} className={`frogs__frog-item ${frogIsVisible} ${color}`}></div>;
      })}
    </div>
  );
};

export default Frogs;
