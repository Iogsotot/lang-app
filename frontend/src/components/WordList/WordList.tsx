import './wordList.scss';
import React, { useEffect, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { useAudios } from '../../hooks/useAudios';
import { WORD_GROUPS } from '../../constants';
import Spinner from '../Spinner/Spinner';

const WordList: FC = () => {
  const history = useHistory();
  const { fetchWords, setGroup, setPage } = useAction();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const { words, page, group, loading, displayButtons, translate } = useTypedSelector(store => store.wordList);
  const { setAudio, toggleAudio, isPlaying } = useAudios(words);

  const playHandler = (word: string) => {
    setAudio(word);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const chooseGroup = (groupNumber: number) => {
    setGroup(groupNumber);
    setPage(0);
  };

  useEffect(() => {
    fetchWords(group, page);
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    if (Number.isInteger(+pageFromUrl) && Number.isInteger(+groupFromUrl)) {
      setPage(+pageFromUrl);
      setGroup(+groupFromUrl);
    }
  }, []);

  return (
    <section>
      <div className="words__container">
        <div className="tabs is-toggle is-toggle-rounded">
          <ul>
            {Object.entries(WORD_GROUPS).map(([key, value]) => (
              <li key={key} className={value === group ? 'is-active' : ''}>
                <a onClick={() => chooseGroup(value)}>
                  <span>{key}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="words">
          <div className="words__inner">
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
          <progress className="progress is-large is-link" value="20" max="100">80%</progress>
        </div>

        <div className="words__pagination">
          <button className="btn btn-sm" disabled={page === 0} onClick={prevPage}>
            Назад
          </button>
          <span>
            {page + 1}
          </span>
          <button className="btn btn-sm" disabled={page === 29} onClick={nextPage}>
            Вперед
          </button>
        </div>
      </div>
    </section>
  );
};

export default WordList;
