import './wordList.scss';
import React, { useEffect, useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { useAudios } from '../../hooks/useAudios';
import { WORD_GROUPS, storageNames } from '../../constants';

const { SHOW_BUTTONS, SHOW_TRANSLATE } = storageNames;

const WordList: FC = () => {
  const history = useHistory();
  const { fetchWords, setGroup, setPage, showButtons, showTranslate } = useAction();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const { words, page, group, loading, displayButtons, translate } = useTypedSelector(store => store.wordList);
  const { setAudio, toggleAudio, currentWord, isPlaying } = useAudios(words);

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

  const handleSettings = () => {
    setOpenSettings(!openSettings);
  };

  const onChangeButtons = () => {
    localStorage.setItem(SHOW_BUTTONS, `${!displayButtons}`);
    showButtons(!displayButtons);
  };

  const onChangeTranslate = () => {
    localStorage.setItem(SHOW_TRANSLATE, `${!translate}`);
    showTranslate(!translate);
  };

  useEffect(() => {
    fetchWords(group, page);
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    showButtons(!!JSON.parse(localStorage.getItem(SHOW_BUTTONS) || 'false'));
    showTranslate(!!JSON.parse(localStorage.getItem(SHOW_TRANSLATE) || 'false'));
    if (Number.isInteger(+pageFromUrl) && Number.isInteger(+groupFromUrl)) {
      setPage(+pageFromUrl);
      setGroup(+groupFromUrl);
    }
  }, []);

  return (
    <section>
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
              <i className="fas fa-cog" />
            </span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
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
                onChange={onChangeTranslate}
              />
            </div>
            <hr className="dropdown-divider" />
            <div className="dropdown-item">
              show buttons:
              <input
                type="checkbox"
                name="buttons"
                checked={displayButtons}
                onChange={onChangeButtons}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="words">
        <div className="audio__controller">
          <button onClick={toggleAudio} className="button is-danger is-outlined">
            <span className="icon is-small">
              {isPlaying ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
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
            <div className="spinner">
              <div className="spinner__inner">
                <div />
              </div>
            </div>
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
    </section>
  );
};

export default WordList;
