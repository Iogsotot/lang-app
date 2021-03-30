import './memory.scss';
import React, { useState, useEffect, FC } from 'react';
import { MemoryProps } from './Memory.model';
import { API_BASE_URL } from '../../../constants/constants';
import { Word } from '../../../models/word';
import MemoryCard from './Memory.card';

const Memory: FC<MemoryProps> = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [wordsLoaded, setWordsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/words`)
      .then(res => res.json())
      .then(res => {
        setWords(res);
        console.log(res);
        setWordsLoaded(true);
      });
  }, []);

  return (
    <section>
      <div className="columns is-multiline">
        { wordsLoaded ?
          words.map((el: Word) => (
            <MemoryCard word={el.word} textMeaning={el.textMeaning}/>
          )) : 'loading'}
      </div>
    </section>
  );
};
/*
{
        wordsLoaded ? words.map((el: Word) => el.word) :
          <progress className="progress is-small is-primary" max="100">15%</progress>
      }
 */

export default Memory;
