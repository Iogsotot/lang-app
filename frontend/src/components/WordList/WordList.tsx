import './wordList.scss';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { fetchWords, setGroup, setPage, showTranslate, showButtons } from './WordList.reducer';
import { useAudios } from '../../hooks/useAudios';
import { WORD_GROUPS } from '../../constants/constants';

const WordList: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const { words, page, group, loading, displayButtons, translate } = useTypedSelector(store => store.wordList);
  const { setAudio, toggleAudio, currentWord, isPlaying } = useAudios(words);

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

  const handleSettings = () => {
    setOpenSettings(!openSettings);
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
    <main>
      <div>
        <p>Groups</p>
        {Object.entries(WORD_GROUPS).map(([key, value]) => (
          <button disabled={value === group} key={key} onClick={() => chooseGroup(value)}>
            {key}
          </button>
        ))}
      </div>

      <div className={`dropdown ${openSettings ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2" onClick={handleSettings}>
            <span>
              <i className="fas fa-cog">&#0;</i>
            </span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true">
                &#0;
              </i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              show translate:
              <input
                type="checkbox"
                name="translate"
                checked={translate}
                onChange={() => dispatch(showTranslate(!translate))}
              />
            </div>
            <hr className="dropdown-divider" />
            <div className="dropdown-item">
              show buttons:
              <input
                type="checkbox"
                name="buttons"
                checked={displayButtons}
                onChange={() => dispatch(showButtons(!displayButtons))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="words">
        <div className="audio__controller">
          <button onClick={toggleAudio} className="button is-danger is-outlined">
            <span className="icon is-small">
              {isPlaying ? <i className="fas fa-pause">&#0;</i> : <i className="fas fa-play">&#0;</i>}
            </span>
          </button>
          {`${currentWord}`}
        </div>

        <div className="words__inner box">
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
    </main>
  );
};

export default WordList;
