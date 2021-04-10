import './wordList.scss';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { useAudios } from '../../hooks/useAudios';
import Spinner from '../Spinner/Spinner';
import EmptyPage from './EmptyPage';
import { DictionarySections } from '../../models';

const {
  LEARNING,
  HARD,
  DELETED,
} = DictionarySections;

const WordList: FC<{ filter?: boolean | string }> = ({ filter }) => {
  const { words, loading, displayButtons, translate } = useTypedSelector(store => store.wordList);
  const { setAudio, toggleAudio, isPlaying, active } = useAudios(words || []);
  const playHandler = (word: string) => {
    setAudio(word);
  };

  if (!words || !words?.length) {
    return (
      !loading
        ? <div className="words">
          <EmptyPage />
        </div>
        : <div className="words">
          <Spinner />
        </div>
    );
  }

  const DisplayWords = () => {
    let newWords = [...words];
    if (filter) {
      newWords = newWords.filter((word) => {
        switch (filter) {
          case LEARNING:
            if (word.userWord?.isLearning !== true || word.userWord?.isDeleted === true) {
              return false;
            }
            break;
          case HARD:
            if (word.userWord?.difficulty !== HARD || word.userWord?.isDeleted === true) {
              return false;
            }
            break;
          case DELETED:
            if (word.userWord?.isDeleted !== true) {
              return false;
            }
            break;
          case true:
            if (word.userWord?.isDeleted === true) {
              return false;
            }
            break;
          default: return true;
        }
        return true;
      });
    }

    if (newWords.length === 0) {
      return (
        <div className="words">
          <EmptyPage />
        </div>
      );
    }

    return (<>
      {newWords.map(word => (
        <WordCard
          key={uuidv4()}
          playHandler={playHandler}
          translate={translate}
          displayButtons={displayButtons}
          {...word}
        />
      ))}</>);
  };

  return (
    <>
      <div className="words">
        <div className="words__inner">
          {!loading ? (
            <DisplayWords />
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      <div className="audio__controller">
        <button
          disabled={!active}
          onClick={toggleAudio}
          className={`btn-play ${isPlaying ? 'pouse' : ''}`}
        >
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
