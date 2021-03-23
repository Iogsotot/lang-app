import React from 'react';
import { WordCardProps } from './WordCard.model';

const WordCard: React.FunctionComponent<WordCardProps> = (props) => {
  const {
    word,
    transcription,
    image,
    textMeaning,
    textExample,
    textMeaningTranslate,
    textExampleTranslate,
  } = props;

  return (
    <div className="word">
      <div className="word__img">
        <img src={image} alt="Word" />
      </div>
      <h3 className="word__name">{`${word} / ${transcription}`}</h3>
      <p className="word__meaning">{textMeaning}</p>
      <p className="word__meaning word__meaning-translate">{textMeaningTranslate}</p>
      <p className="word__example">{textExample}</p>
      <p className="word__example word__example-translate">{textExampleTranslate}</p>
    </div>
  );
};

export default WordCard;
