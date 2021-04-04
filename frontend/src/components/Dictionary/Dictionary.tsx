// import './dictionary.scss';
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordList from '../WordList';
import { WORD_GROUPS } from '../../constants';

const Dictionary: FC = () => {
  const history = useHistory();
  const { fetchWords, setGroup, setPage } = useAction();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const { page, group } = useTypedSelector(store => store.wordList);

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
    history.push(`/dictionary/learning/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    if (Number.isInteger(+pageFromUrl) && Number.isInteger(+groupFromUrl)) {
      setPage(+pageFromUrl);
      setGroup(+groupFromUrl);
    }
  }, []);
  return (
    <main className="dictionary">
      <div className="tabs is-centered is-boxed">
        <ul>
          <li className="is-active">
            <a>
              <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
              <span>Pictures</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
              <span>Music</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
              <span>Videos</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="tabs is-toggle is-toggle-rounded group-tabs">
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
      <WordList />
      <div className="words__pagination">
        <button className="btn btn-sm" disabled={page === 0} onClick={prevPage}>
          Назад
        </button>
        <span>{page + 1}</span>
        <button className="btn btn-sm" disabled={page === 29} onClick={nextPage}>
          Вперед
        </button>
      </div>
    </main>
  );
};

export default Dictionary;
