import { FC } from 'react';

import { DifficultyProps } from './Difficulty.model';

import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import { WORD_GROUPS } from '../../../constants/constants';

import './Difficulty.scss';

const Difficulty: FC<DifficultyProps> = ({ handleStart }) => {
  const { group } = useTypedSelector(store => store.wordList);
  const { setGroup } = useAction();

  return (
    <div className="difficulty-btn-block">
      <p>Сложность:</p>
      {Object.entries(WORD_GROUPS).map(([key, value]) => (
        <button
          disabled={value === group}
          key={key}
          onClick={() => {
            setGroup(value);
          }}
          className="button is-warning is-small"
        >
          {key}
        </button>
      ))}
      <button className="btn--start button is-primary is-outlined" onClick={handleStart}>
        Начать игру!
      </button>
    </div>
  );
};

export default Difficulty;
