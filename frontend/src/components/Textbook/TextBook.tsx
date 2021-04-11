import './textbook.scss';
import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordList from '../WordList';
import { WORD_GROUPS, MAX_PAGE, MIN_PAGE, ALL_WORDS_IN_GROUP } from '../../constants';
import Pagination from '../Pagination';

const TextBook: FC = () => {
  const history = useHistory();
  const {
    fetchUserWords,
    fetchWords,
    setGroup,
    setPage,
    setLocalPage,
  } = useAction();
  const { group: groupFromUrl, page: pageFromUrl }: { group: string; page: string } = useParams();
  const store = useTypedSelector(commonStore => commonStore);
  const { page, group, loading, groupOfWords } = store.wordList;
  const { isLoggedIn, user } = store.user;

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
    if (isLoggedIn) {
      if (groupOfWords) {
        setLocalPage(groupOfWords[page - 1]);
      }
    } else {
      fetchWords(group - 1, page - 1);
    }
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserWords({
        group: group - 1,
        token: user.token,
        userId: user.userId,
        amount: ALL_WORDS_IN_GROUP,
        hideDeleted: true,
      });
    }
  }, [group]);

  useEffect(() => {
    if (Number.isInteger(+pageFromUrl) && Number.isInteger(+groupFromUrl)) {
      setPage(+pageFromUrl);
      setGroup(+groupFromUrl);
    }
  }, []);
  return (
    <main className={`textbook ${Object.keys(WORD_GROUPS)[group - 1]}`}>
      <div className="wrapper">
        <div className="tabs is-toggle is-toggle-rounded custom-tabs group-tabs">
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
        <WordList filter={isLoggedIn} />
        <Pagination
          minPage={MIN_PAGE}
          maxPage={isLoggedIn ? (groupOfWords?.length || MAX_PAGE) : MAX_PAGE}
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
