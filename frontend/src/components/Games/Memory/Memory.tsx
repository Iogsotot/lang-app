import './memory.scss';
import React, { useState, useEffect, FC } from 'react';
import { MemoryProps } from './Memory.model';
import { API_BASE_URL } from '../../../constants/constants';

const Memory: FC<MemoryProps> = () => {
  const [words, setWords] = useState<any>(null);
  const [wordsLoaded, setWordsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/words`)
      .then(res => res.json())
      .then(res => {
        setWords(res);
        setWordsLoaded(true);
      });
  }, []);

  return (
    <>
      {
        wordsLoaded ? words.map((el:any) => el.word) :
          <progress className="progress is-small is-primary" max="100">15%</progress>
      }
    </>
  );
};

export default Memory;
