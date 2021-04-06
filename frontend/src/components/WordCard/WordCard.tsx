import './wordCard.scss';
import React, { FC, useState } from 'react';
import { WordCardProps } from './WordCard.model';
import { API_BASE_URL } from '../../constants';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const WordCard: FC<WordCardProps> = props => {
  const {
    id,
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
  const { userId, token } = useTypedSelector((store) => store.user.user);
  const [loading, setLoading] = useState(false);

  const deleteWord = async () => {
    setLoading(true);
    const body = JSON.stringify({
      difficulty: 'string',
      isDeleted: true,
    });
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/words/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      },
    );
    const data = await response.json();
    console.log(data);
    setLoading(false);
  };

  const addWordToHard = async () => {
    setLoading(true);
    const body = JSON.stringify({
      difficulty: 'string',
      isDeleted: true,
    });
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/words/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      },
    );
    const data = await response.json();
    console.log(data);
    setLoading(false);
  };

  const playAudio = () => {
    playHandler(word);
  };

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
          <button className="button is-outlined" onClick={playAudio}>
            <span className="icon is-small">
              <i className="fas fa-play" />
            </span>
          </button>

          {displayButtons ? (
            <>
              <button disabled={loading} onClick={addWordToHard} className="button is-warning">
                <span className="icon is-small">
                  <i className="fas fa-bookmark" />
                </span>
                <span>В сложные</span>
              </button>
              <button disabled={loading} onClick={deleteWord} className="button is-danger is-outlined">
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
