import './wordList.scss';
import { FC, useMemo } from 'react';
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
  const { words, loading } = useTypedSelector(store => store.wordList);
  const { setAudio, toggleAudio, isPlaying, active } = useAudios(words || []);

  const filteredWords = useMemo(() => {
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
    return newWords;
  }, [words]);

  if (!words || filteredWords.length === 0) {
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

  return (
    <>
      <div className="words">
        <div className="words__inner">
          {!loading ? (
            filteredWords.map(word => (
              <WordCard
                key={uuidv4()}
                playHandler={setAudio}
                {...word}
              />
            ))
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
    </>
  );
};

export default WordList;
