import './wordCard.scss';
import React, { FC } from 'react';
import { WordCardProps } from './WordCard.model';

const WordCard: FC<WordCardProps> = props => {
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
    <div className="word">
      <figure className="word__image">
        <img src={image} alt={word} />
      </figure>

      <div className="word__info">
        <h3 className="word__name">{`${word} (${transcription}) ${translate ? `/ ${wordTranslate}` : ''}`}</h3>
        <p className="word__meaning">{textMeaning}</p>
        {translate ? <p className="word__meaning word__meaning-translate">{textMeaningTranslate}</p> : ''}

        <p className="word__example">{textExample}</p>

        {translate ? <p className="word__example word__example-translate">{textExampleTranslate}</p> : ''}

        <div className="word__buttons">
          <button className="button is-outlined" onClick={() => playHandler(word)}>
            <span className="icon is-small">
              <i className="fas fa-play" />
            </span>
          </button>

          {displayButtons ? (
            <>
              <button className="button is-warning">
                <span className="icon is-small">
                  <i className="fas fa-bookmark" />
                </span>
                <span>В сложные</span>
              </button>
              <button className="button is-danger is-outlined">
                <span className="icon is-small">
                  <i className="fas fa-trash" />
                </span>
                <span>Удалить</span>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
