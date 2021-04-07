import './textbook.scss';
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordList from '../WordList';
import { WORD_GROUPS, MAX_PAGE, MIN_PAGE } from '../../constants';
import Pagination from '../Pagination';

const TextBook: FC = () => {
  const history = useHistory();
  const { fetchWords, setGroup, setPage } = useAction();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const { page, group, loading } = useTypedSelector(store => store.wordList);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const choosePage = (numOfPage: number) => {
    setPage(numOfPage);
  };

  const chooseGroup = (groupNumber: number) => {
    setGroup(groupNumber);
    setPage(1);
  };

  useEffect(() => {
    fetchWords(group - 1, page - 1);
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
              <li key={key} className={value === group - 1 ? 'is-active' : ''}>
                <a onClick={() => chooseGroup(value + 1)}>
                  <span>{key}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <WordList />
        <Pagination
          minPage={MIN_PAGE}
          maxPage={MAX_PAGE}
          loading={loading}
          nextPage={nextPage}
          prevPage={prevPage}
          choosePage={choosePage}
          page={page}
        />
      </div>
    </main>
  );
};

export default TextBook;
