import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { DifficultyProps } from './Difficulty.model';

import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import { WORD_GROUPS } from '../../../constants/constants';

import './Difficulty.scss';

const Difficulty: FC<DifficultyProps> = ({ handleStart, title, desc }) => {
  const { group, words } = useTypedSelector(store => store.wordList);
  const { setGroup } = useAction();
  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

  const isLvlShouldBeSelected = () =>
    (previousLocation !== 'textbook' && previousLocation !== 'dictionary') || words.length === 0;

  return (
    <div className="box difficulty__box savannah__info">
      <div className="difficulty-btn-block">
        <h2 className="title is-2">{title}</h2>
        <p>{desc}</p>
        {isLvlShouldBeSelected() && (
          <>
            <p>Сложность:</p>
            {Object.entries(WORD_GROUPS).map(([key, value]) => (
              <button
                disabled={value === group}
                key={key}
                onClick={() => {
                  setGroup(value);
                }}
                className="button is-warning is-small btn__difficulty"
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
