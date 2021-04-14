import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { DifficultyProps } from './Difficulty.model';

import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import { WORD_GROUPS } from '../../../constants/constants';

import './Difficulty.scss';

const Difficulty: FC<DifficultyProps> = ({ handleStart, title, desc }) => {
  const { group } = useTypedSelector(store => store.wordList);
  const { setGroup } = useAction();
  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

  return (
    <div className="box difficulty__box">
      <div className="difficulty-btn-block">
        <h2 className="title is-2">{title}</h2>
        <p>{desc}</p>
        {previousLocation !== 'textbook' && previousLocation !== 'dictionary' && (
          <>
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
          </>
        )}

        <button className="btn--start button is-primary is-outlined" onClick={handleStart}>
          Начать игру!
        </button>
      </div>
    </div>
  );
};

export default Difficulty;
