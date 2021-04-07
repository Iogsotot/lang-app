import './dictionary.scss';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordList from '../WordList';
import { MIN_PAGE, WORD_GROUPS, ALL_WORDS_IN_GROUP } from '../../constants';
import { DictionarySections } from '../../models';
import Pagination from '../Pagination';

type Sections = 'learning' | 'hard' | 'deleted';
const {
  LEARNING,
  HARD,
  DELETED,
} = DictionarySections;

const Dictionary: FC = () => {
  const history = useHistory();
  const { setLocalPage, fetchUserWords, setGroup, setPage } = useAction();
  const {
    section,
    group: groupFromUrl,
    page: pageFromUrl,
  }: {
    section: Sections;
    group: string;
    page: string;
  } = useParams();
  const store = useTypedSelector(commonStore => commonStore);
  const { page, group, loading, groupOfWords } = store.wordList;
  const { userId, token } = store.user.user;
  const [activeSection, setActiveSection] = useState<Sections>(LEARNING);

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

  const setSection = (clickedSection: Sections) => {
    setActiveSection(clickedSection);
  };

  useEffect(() => {
    fetchUserWords({
      section: activeSection,
      group: group - 1,
      amount: ALL_WORDS_IN_GROUP,
      userId,
      token,
    });
    if (groupOfWords) {
      setLocalPage(groupOfWords[page - 1]);
    }
    history.push(`/dictionary/${activeSection}/${group}/${page}`);
  }, [activeSection, group]);

  useEffect(() => {
    if (groupOfWords) {
      setLocalPage(groupOfWords[page - 1]);
    }
    history.push(`/dictionary/${activeSection}/${group}/${page}`);
  }, [activeSection, group, page]);

  useEffect(() => {
    if (Number.isInteger(+pageFromUrl) && Number.isInteger(+groupFromUrl)) {
      setPage(+pageFromUrl);
      setGroup(+groupFromUrl);
    }
    setActiveSection(section);
  }, []);
  return (
    <main className="dictionary">
      <div className="tabs is-centered is-boxed section-tabs">
        <ul>
          <li className={`${activeSection === LEARNING ? 'is-active' : ''}`}>
            <a onClick={() => setSection(LEARNING)}>
              <span className="icon is-small"><i className="fas fa-book" aria-hidden="true"></i></span>
              <span>Изучаемые слова</span>
            </a>
          </li>
          <li className={`${activeSection === HARD ? 'is-active' : ''}`}>
            <a onClick={() => setSection(HARD)}>
              <span className="icon is-small"><i className="fas fa-biohazard" aria-hidden="true"></i></span>
              <span>Сложные слова</span>
            </a>
          </li>
          <li className={`${activeSection === DELETED ? 'is-active' : ''}`}>
            <a onClick={() => setSection(DELETED)}>
              <span className="icon is-small"><i className="fas fa-trash" aria-hidden="true"></i></span>
              <span>Удалённые слова</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="tabs is-toggle is-toggle-rounded group-tabs">
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
        maxPage={groupOfWords?.length || 1}
        loading={loading}
        nextPage={nextPage}
        prevPage={prevPage}
        choosePage={choosePage}
        page={page}
      />
    </main>
  );
};

export default Dictionary;
