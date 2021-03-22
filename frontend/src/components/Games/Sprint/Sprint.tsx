import React, { useState, useEffect, FC } from 'react';

import Button from './Button';
import { shuffleArray, getRandomBooleanAnswer, randomInteger } from '../../../libs/random';
import { compareAnswer } from '../../../libs/gameLogic';
import { WordsProps, Word } from '../../../models';
import { WordPair } from './Sprint.model';

import './Sprint.scss';

const Sprint: FC<WordsProps> = ({ words }) => {
  const [sprintWords, setSprintWords] = useState(shuffleArray(words));
  const [pair, setPair] = useState({
    word: 'null',
    wordTranslate: 'null',
    answer: false,
  });

  const findWordPair = ():WordPair => {
    if (sprintWords.length < 1) throw new Error();
    const wordsList = sprintWords.slice(0);
    const word = wordsList.pop() as Word;

    setSprintWords(wordsList);

    return getRandomBooleanAnswer() ?
      {
        word: word.word,
        wordTranslate: word.wordTranslate,
        answer: true }
      : {
        word: word.word,
        wordTranslate: sprintWords[randomInteger(sprintWords.length - 2)].wordTranslate,
        answer: false,
      };
  };

  useEffect(() => {
    setPair(findWordPair());
  }, []);

  const handleBtnClick = (arg:boolean):void => {
    console.log(compareAnswer(arg, pair.answer));
    setPair(findWordPair());
  };

  const { word, wordTranslate } = pair;
  return (
    <div className="sprint">
      <div className="box sprint__box">
        <div className="title">{word}</div>
        <div className="subtitle">{wordTranslate}</div>
        <div className="buttons">
          <Button className="is-danger" text="Wrong" onBtnClick={handleBtnClick} answer={false}/>
          <Button className="is-success" text="Correct" onBtnClick={handleBtnClick} answer={true}/>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
