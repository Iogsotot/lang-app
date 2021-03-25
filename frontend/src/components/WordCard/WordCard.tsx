import './wordCard.scss';
import React from 'react';
import { WordCardProps } from './WordCard.model';

const WordCard: React.FunctionComponent<WordCardProps> = props => {
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
    translate,
    displayButtons,
  } = props;

  return (
    <div className="word columns is-1">

      <figure className="image">
        <img src={image} alt="Word" />
      </figure>

      <div className="word__info column is-7">
        <h3 className="word__name">{`${word} (${transcription}) ${translate ? `/ ${wordTranslate}` : ''}`}</h3>
        <p className="word__meaning">{textMeaning}</p>
        {translate ? <p className="word__meaning word__meaning-translate">{textMeaningTranslate}</p> : ''}

        <p className="word__example">{textExample}</p>

        {translate ? <p className="word__example word__example-translate">{textExampleTranslate}</p> : ''}

        <button className="button is-outlined" onClick={() => playHandler(word)}>
          <span className="icon is-small">
            <i className="fas fa-volume-up"></i>
          </span>
        </button>

        {displayButtons ? (
          <>
            <button className="button is-success">
              <span className="icon is-small">
                <i className="fas fa-check"></i>
              </span>
              <span>Save</span>
            </button>
            <button className="button is-danger is-outlined">
              <span>Delete</span>
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default WordCard;
