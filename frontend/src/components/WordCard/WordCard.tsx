import React from 'react';
import { WordCardProps } from './WordCard.model';

const WordCard: React.FunctionComponent<WordCardProps> = (props) => {
  const {
    word,
    transcription,
    wordTranslate,
    image,
    textMeaning,
    textExample,
    textMeaningTranslate,
    textExampleTranslate,
    playHandler,
  } = props;

  return (
    <div className="word">
      <div className="word__img">
        <img src={image} alt="Word" />
      </div>
      <h3 className="word__name">{`${word} (${transcription}) / ${wordTranslate}`}</h3>
      <p className="word__meaning">{textMeaning}</p>
      <p className="word__meaning word__meaning-translate">{textMeaningTranslate}</p>
      <p className="word__example">{textExample}</p>
      <p className="word__example word__example-translate">{textExampleTranslate}</p>
      <button onClick={() => playHandler(word)}>Play</button>
    </div>
  );
};

export default WordCard;
