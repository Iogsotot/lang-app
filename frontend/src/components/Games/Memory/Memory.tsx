import './memory.scss';
import React, { useState, useEffect, FC, useCallback } from 'react';
import { MemoryProps } from './Memory.model';
import { API_BASE_URL } from '../../../constants/constants';
import { Word } from '../../../models/word';
import MemoryCard from './Memory.card';

const Memory: FC<MemoryProps> = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [wordsLoaded, setWordsLoaded] = useState<boolean>(false);
  const [current, setCurrent] = useState('');
  const [previous, setPrevious] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/words/all?amount=5`)
      .then(res => res.json())
      .then(res => {
        const doubledWords = [...res, ...res];
        console.log(doubledWords);
        const indexedArr = doubledWords.map((el: any, i) => {
          el.code = i;
          return el;
        });
        console.log(indexedArr);
        setWords(indexedArr);
        setWordsLoaded(true);
      });
  }, []);
  useEffect(() => {
    if (current === previous) {
      // do smth
    }
  }, [current, previous]);

  const selectCard = (e: any) => {
    const { id } = e.target.closest('.card');
    const updatedWords = words.map((el: any) => (
      id === el.code ?
        ({ ...el, selected: true }) : el));
    setWords(updatedWords);
    if (current) {
      setPrevious(current);
    }
    setCurrent(id);
  };

  return (
    <section>
      <div className="columns is-multiline">
        { wordsLoaded ?
          words.map((el: any) => (
            <MemoryCard
              id={el.code}
              selected={el.selected}
              won={el.won}
              word={el.word}
              textMeaning={el.textMeaning}
              onSelection={selectCard}
            />
          )) :
          <div className="spinner">
            <div className="spinner__inner">
              <div>&#0;</div>
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default Memory;
