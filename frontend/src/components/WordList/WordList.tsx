import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import { fetchWords } from './WordList.reducer';

const WordList: React.FunctionComponent = () => {
  const { words } = useTypedSelector((store) => store.wordList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords());
  }, []);

  return (
    <div>
      {words.map((word) => <WordCard key={word.id} {...word} />)}
    </div>
  );
};

export default WordList;
