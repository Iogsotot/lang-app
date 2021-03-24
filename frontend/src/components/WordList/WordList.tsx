import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import WordCard from '../WordCard';
import {
  fetchWords,
  changeGroup,
  changePage,
  showTranslate,
  showButtons,
} from './WordList.reducer';
import { useAudios } from '../../hooks/useAudios';

const WordList: React.FunctionComponent = () => {
  const {
    words,
    page,
    group,
    displayButtons,
    translate,
  } = useTypedSelector((store) => store.wordList);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    group: groupFromUrl,
    page: pageFromUrl,
  }: { group: string, page: string } = useParams();
  const audios = words.map((word) => ({
    word: word.word,
    audios: [
      word.audio,
      word.audioMeaning,
      word.audioExample,
    ],
  }));
  const { startAudio } = useAudios(audios);

  const playHandler = (word: string) => {
    startAudio(word);
  };

  const nextPage = () => {
    dispatch(changePage(page + 1));
  };

  const prevPage = () => {
    dispatch(changePage(page - 1));
  };

  const chooseGroup = (number: number) => {
    dispatch(changeGroup(number));
  };

  useEffect(() => {
    dispatch(fetchWords(group, page));
    history.push(`/textbook/${group}/${page}`);
  }, [group, page]);

  useEffect(() => {
    dispatch(changePage(+pageFromUrl));
    dispatch(changeGroup(+groupFromUrl));
  }, []);

  return (
    <div>
      <div>

        {[0, 1, 2, 3, 4, 5].map((button) =>
          <button key={button} onClick={() => chooseGroup(button)}>{button}</button>)}
      </div>

      <div>
        <button onClick={prevPage}>prev</button>
        {page + 1}
        <button onClick={nextPage}>next</button>
      </div>

      <div>
        Settings:
        <div>
          show translate:
          <input
            type="checkbox"
            name="translate"
            checked={translate}
            onChange={() => dispatch(showTranslate(!translate))}
          />
        </div>
        <div>
          show buttons:
          <input
            type="checkbox"
            name="buttons"
            checked={displayButtons}
            onChange={() => dispatch(showButtons(!displayButtons))}
          />
        </div>
      </div>

      {words.map((word) => (
        <WordCard
          key={word.id}
          playHandler={playHandler}
          translate={translate}
          displayButtons={displayButtons}
          {...word}
        />))}
    </div>
  );
};

export default WordList;
