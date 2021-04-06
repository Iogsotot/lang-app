import './dictionary.scss';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordList from '../WordList';
import { WORD_GROUPS } from '../../constants';

type Sections = 'learning' | 'hard' | 'deleted';

const Dictionary: FC = () => {
  const history = useHistory();
  const { fetchWords, setGroup, setPage } = useAction();
  const {
    section,
    group: groupFromUrl,
    page: pageFromUrl,
  }: {
    section: Sections;
    group: string;
    page: string;
  } = useParams();
  const { page, group } = useTypedSelector(store => store.wordList);
  const [activeSection, setActiveSection] = useState<Sections>('learning');
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

  const setSection = (clickedSection: Sections) => {
    setActiveSection(clickedSection);
  };

  useEffect(() => {
    fetchWords(group, page);
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
          <li className={`${activeSection === 'learning' ? 'is-active' : ''}`}>
            <a onClick={() => setSection('learning')}>
              <span className="icon is-small"><i className="fas fa-book" aria-hidden="true"></i></span>
              <span>Изучаемые слова</span>
            </a>
          </li>
          <li className={`${activeSection === 'hard' ? 'is-active' : ''}`}>
            <a onClick={() => setSection('hard')}>
              <span className="icon is-small"><i className="fas fa-biohazard" aria-hidden="true"></i></span>
              <span>Сложные слова</span>
            </a>
          </li>
          <li className={`${activeSection === 'deleted' ? 'is-active' : ''}`}>
            <a onClick={() => setSection('deleted')}>
              <span className="icon is-small"><i className="fas fa-trash" aria-hidden="true"></i></span>
              <span>Удалённые слова</span>
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
