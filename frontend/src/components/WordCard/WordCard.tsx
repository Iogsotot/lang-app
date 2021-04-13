import './wordCard.scss';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WordCardProps } from './WordCard.model';
import { API_BASE_URL } from '../../constants';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';
import { DictionarySections } from '../../models';

const {
  HARD,
} = DictionarySections;

const WordCard: FC<WordCardProps> = props => {
  const {
    id,
    _id: dashedId,
    word,
    transcription,
    wordTranslate,
    image,
    textMeaning,
    textExample,
    textMeaningTranslate,
    textExampleTranslate,
    playHandler,
    userWord,
  } = props;
  const store = useTypedSelector(commonStore => commonStore);
  const { user, isLoggedIn } = store.user;
  const { words, displayButtons, translate } = store.wordList;
  const { userId, token } = user;
  const [loading, setLoading] = useState(false);
  const { updateWord } = useAction();

  const deleteWord = async () => {
    setLoading(true);
    const body = JSON.stringify({
      isDeleted: true,
    });
    const newId = isLoggedIn ? dashedId : id;
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/words/${newId}`,
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
    if (response.status === 417) {
      await fetch(
        `${API_BASE_URL}/users/${userId}/words/${newId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body,
        },
      );
    }
    const thisWord = { ...props, userWord: { isDeleted: true } };
    updateWord(words, thisWord);
    setLoading(false);
  };

  const addWordToHard = async () => {
    setLoading(true);
    const body = JSON.stringify({
      difficulty: 'hard',
      isLearning: true,
    });
    const newId = isLoggedIn ? dashedId : id;
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/words/${newId}`,
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
    if (response.status === 417) {
      await fetch(
        `${API_BASE_URL}/users/${userId}/words/${newId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body,
        },
      );
    }
    const thisWord = { ...props, userWord: { difficulty: 'hard', isLearning: true } };
    updateWord(words, thisWord);
    setLoading(false);
  };

  const restoreWord = async () => {
    setLoading(true);
    const body = JSON.stringify({
      isDeleted: false,
    });
    const newId = isLoggedIn ? dashedId : id;
    await fetch(
      `${API_BASE_URL}/users/${userId}/words/${newId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      },
    );
    const thisWord = { ...props, userWord: { isDeleted: false } };
    updateWord(words, thisWord);
    setLoading(false);
  };

  const moveToEasy = async () => {
    setLoading(true);
    const body = JSON.stringify({
      difficulty: 'easy',
    });
    const newId = isLoggedIn ? dashedId : id;
    await fetch(
      `${API_BASE_URL}/users/${userId}/words/${newId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      },
    );
    const thisWord = { ...props, userWord: { difficulty: 'easy', isLearning: true } };
    updateWord(words, thisWord);
    setLoading(false);
  };

  const playAudio = () => {
    playHandler(word);
  };

  const Buttons = () => {
    if (userWord?.isDeleted) {
      return (
        <button disabled={!isLoggedIn || loading} onClick={restoreWord} className="button is-success is-outlined">
          <span className="icon is-small">
            <i className="fas fa-trash-restore" />
          </span>
          <span>Восстановить</span>
        </button>
      );
    }
    if (userWord?.difficulty === HARD) {
      return (
        <>
          <button disabled={!isLoggedIn || loading} onClick={moveToEasy} className="button is-warning">
            <span className="icon is-small">
              <i className="fas fa-bookmark" />
            </span>
            <span>Убрать из сложных</span>
          </button>
          <button disabled={!isLoggedIn || loading} onClick={deleteWord} className="button is-danger is-outlined">
            <span className="icon is-small">
              <i className="fas fa-trash" />
            </span>
            <span>Удалить</span>
          </button>
        </>
      );
    }
    return (
      <>
        <button disabled={!isLoggedIn || loading} onClick={addWordToHard} className="button is-warning">
          <span className="icon is-small">
            <i className="fas fa-bookmark" />
          </span>
          <span>В сложные</span>
        </button>
        <button disabled={!isLoggedIn || loading} onClick={deleteWord} className="button is-danger is-outlined">
          <span className="icon is-small">
            <i className="fas fa-trash" />
          </span>
          <span>Удалить</span>
        </button>
      </>
    );
  };

  const Tags = () => {
    const tags = Object.entries(userWord || {}).map(([key, value]) => {
      switch (key) {
        case 'difficulty':
          return value === HARD ? (
            <span key={uuidv4()} className="tag is-warning is-light">Сложное</span>
          ) : <span key={uuidv4()}></span>;
        case 'isLearning':
          return value ? (
            <span key={uuidv4()} className="tag is-success is-light">Изучаемое</span>
          ) : <span key={uuidv4()}></span>;
        case 'isDeleted':
          return value ? (
            <span key={uuidv4()} className="tag is-danger is-light">Удаленное</span>
          ) : <span key={uuidv4()}></span>;
        default: return <span key={uuidv4()}></span>;
      }
    });
    return (
      <>
        {tags}
      </>
    );
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
          {displayButtons ? <Buttons /> : <></>}
        </div>
        <div className="tags">
          <Tags />
        </div>
      </div>
    </div>
  );
};

export default WordCard;
