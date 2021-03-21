import React, { useState, useEffect, FC } from 'react';

import { shuffleArray, getRandomBooleanAnswer, randomInteger } from '../../../libs/random';
import { WordsProps, Word } from '../../../models';

import './Sprint.scss';

const Sprint: FC<WordsProps> = ({ words }) => {
  const [sprintWords, setSprintWords] = useState(shuffleArray(words));
  const [pair, setPair]: any[] = useState({
    word: 'null',
    wordTranslate: 'null',
  });

  const findWordPair = ():{ word: string, wordTranslate: string } => {
    if (sprintWords.length < 1) throw new Error();
    const wordsList = sprintWords.slice(0);
    const word = wordsList.pop() as Word;

    setSprintWords(wordsList);

    return getRandomBooleanAnswer() ?
      { word: word.word, wordTranslate: word.wordTranslate }
      : { word: word.word, wordTranslate: sprintWords[randomInteger(sprintWords.length - 2)].wordTranslate };
  };

  useEffect(() => {
    setPair(findWordPair());
  }, []);

  const { word, wordTranslate } = pair;
  return (
    <div className="sprint">
      <div className="box sprint__box">
        <div className="title">{word}</div>
        <div className="subtitle">{wordTranslate}</div>
        <div className="buttons">
          <button className="button is-danger">Wrong</button>
          <button className="button is-success">Correct</button>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
