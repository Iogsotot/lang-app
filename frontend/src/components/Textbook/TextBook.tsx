import './textbook.scss';
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordList from '../WordList';
import { WORD_GROUPS } from '../../constants';

const TextBook: FC = () => {
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
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    if (Number.isInteger(+pageFromUrl) && Number.isInteger(+groupFromUrl)) {
      setPage(+pageFromUrl);
      setGroup(+groupFromUrl);
    }
  }, []);
  return (
    <main className="textbook">
      <div className="wrapper">
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
      </div>
    </main>
  );
};

export default TextBook;
