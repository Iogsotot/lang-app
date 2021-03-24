import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import {
  fetchWords,
  changeGroup,
  changePage,
} from './WordList.reducer';

const WordList: React.FunctionComponent = () => {
  const { words, page, group } = useTypedSelector((store) => store.wordList);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    group: groupFromUrl,
    page: pageFromUrl,
  }: { group: string, page: string } = useParams();

  const nextPage = () => {
    dispatch(changePage(page + 1));
  };

  const prevPage = () => {
    dispatch(changePage(page - 1));
  };

  const chooseGroup = (number: number) => {
    dispatch(changeGroup(number));
  };

  useEffect(() => {
    dispatch(fetchWords(group, page));
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    dispatch(changePage(+pageFromUrl));
    dispatch(changeGroup(+groupFromUrl));
  }, []);

  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((button) =>
        <button key={button} onClick={() => chooseGroup(button)}>{button}</button>)}

      <button onClick={prevPage}>prev</button>
      {page + 1}
      <button onClick={nextPage}>next</button>
      {words.map((word) => <WordCard key={word.id} {...word} />)}
    </div>
  );
};

export default WordList;
