import './wordList.scss';
import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { useAudios } from '../../hooks/useAudios';
import Spinner from '../Spinner/Spinner';

const WordList: FC = () => {
  const store = useTypedSelector(commonStore => commonStore);
  const { words, loading, displayButtons, translate } = store.wordList;
  const { isLoggedIn } = store.user;
  const { setAudio, toggleAudio, isPlaying } = useAudios(words);

  const playHandler = (word: string) => {
    setAudio(word);
  };

  const makeWords = () => {
    if (isLoggedIn) {
      return (words
        .filter(word => {
          if (word.userWord?.isDeleted) {
            return !word.userWord?.isDeleted;
          }
          return true;
        })
        .map(word => (
          <WordCard
            key={word.id}
            playHandler={playHandler}
            translate={translate}
            displayButtons={displayButtons}
            {...word}
          />
        )));
    }
    return (words.map(word => (
      <WordCard
        key={word.id}
        playHandler={playHandler}
        translate={translate}
        displayButtons={displayButtons}
        {...word}
      />
    )));
  };

  return (
    <>
      <div className="words">
        <div className="words__inner">
          {!loading ? (
            makeWords()
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      <div className="audio__controller">
        <button onClick={toggleAudio} className={`btn-play ${isPlaying ? 'pouse' : ''}`}>
          <span className="icon is-small">
            {isPlaying ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
          </span>
        </button>
      </div>

      <div className="words__progress__bar">
        <progress className="progress is-large is-link" value="20" max="100">
          80%
        </progress>
      </div>
    </>
  );
};

export default WordList;
