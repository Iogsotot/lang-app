import './wordList.scss';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { fetchWords, setGroup, setPage, showTranslate, showButtons } from './WordList.reducer';
import { useAudios } from '../../hooks/useAudios';

const WordList: React.FunctionComponent = () => {
  const { words, page, group, loading, displayButtons, translate } = useTypedSelector(store => store.wordList);
  const dispatch = useDispatch();
  const history = useHistory();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const {
    setAudio,
    toggleAudio,
    currentWord,
    isPlaying,
  } = useAudios(words);

  const playHandler = (word: string) => {
    setAudio(word);
  };

  const nextPage = () => {
    dispatch(setPage(page + 1));
  };

  const prevPage = () => {
    dispatch(setPage(page - 1));
  };

  const chooseGroup = (number: number) => {
    dispatch(setGroup(number));
    dispatch(setPage(0));
  };

  useEffect(() => {
    dispatch(fetchWords(group, page));
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    dispatch(setPage(+pageFromUrl));
    dispatch(setGroup(+groupFromUrl));
  }, []);

  return (
    <main className="content">
      <div>
        {[0, 1, 2, 3, 4, 5].map(button => (
          <button disabled={button === group} key={button} onClick={() => chooseGroup(button)}>
            {button}
          </button>
        ))}
      </div>

      <div>
        <button disabled={page === 0} onClick={prevPage}>
          prev
        </button>
        {page + 1}
        <button disabled={page === 29} onClick={nextPage}>
          next
        </button>
      </div>

      <div>
        Settings:
        <div>
          show translate:
          <input
            type="checkbox"
            name="translate"
            checked={translate}
            onChange={() => dispatch(showTranslate(!translate))}
          />
        </div>
        <div>
          show buttons:
          <input
            type="checkbox"
            name="buttons"
            checked={displayButtons}
            onChange={() => dispatch(showButtons(!displayButtons))}
          />
        </div>
      </div>

      <div className="words__container box">
        <div className="audio__controller">
          <button onClick={toggleAudio} className="button is-danger is-outlined">
            <span className="icon is-small">
              {
                isPlaying
                  ? <i className="fas fa-pause"></i>
                  : <i className="fas fa-play"></i>
              }
            </span>
          </button>
          {`${currentWord}`}
        </div>
        {!loading ? (
          words.map(word => (
            <WordCard
              key={word.id}
              playHandler={playHandler}
              translate={translate}
              displayButtons={displayButtons}
              {...word}
            />
          ))
        ) : (
          <h2>LOADING!!!</h2>
        )}
      </div>
    </main>
  );
};

export default WordList;
