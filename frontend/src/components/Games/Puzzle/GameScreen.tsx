import React, { FC, useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import useSound from 'use-sound';
import { Word } from '../../../models/word';
import Phrase from './Phrase/Phrase';
import Variants from './Variants/Variants';
import './puzzle.scss';
import { API_BASE_URL } from '../../../constants/constants';
import { GameScreenProps } from './Puzzle.model';
import successSound from '../../../assets/audio/happySound.mp3';
import failureSound from '../../../assets/audio/failure.mp3';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const reorder = (list: Word[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const deleteGuessElem = (el: Word | undefined, list: Word[]) => {
  if (el) {
    const index = list.indexOf(el);
    list.splice(index, 1);
  }
  return list;
};
const returnElementToList = (el: Word | undefined, list: Word[]) => {
  if (el) {
    list.push(el);
  }
  return list;
};
const correctAnswers: Array<Word | undefined> = [];
const wrongAnswers: Array<Word | undefined> = [];

const GameScreen: FC<GameScreenProps> = (props) => {
  const wordList = useTypedSelector(commonStore => commonStore.wordList);
  const { words } = wordList;
  const { group, setGameFinished, setCorrectAnswers, setWrongAnswers } = props;
  const [collection, setCollection] = useState<Word[]>([]);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<Word | undefined>(undefined);
  const [counter, setCounter] = useState(0);
  const [outline, setOutline] = useState('');
  const [playSuccess] = useSound(successSound);
  const [playFailure] = useSound(failureSound);

  const startNewGame = () => {
    fetch(`${API_BASE_URL}/words/all?amount=5?group=${group}`)
      .then(res => res.json())
      .then(res => {
        const value = Math.floor(Math.random() * res.length);
        const randomElem = res[value];
        setPhrase(randomElem.textMeaning);
        setWord(randomElem.word);
        setCollection(res);
        setGuess(undefined);
        setCounter(counter + 1);
      });
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const triggerValidation = (elem: Word | undefined) => {
    if (elem?.word === word) {
      if (counter === 5) {
        setGameFinished(true);
      }
      if (!correctAnswers.find(el => el === elem)) {
        correctAnswers.push(elem);
        setCorrectAnswers(correctAnswers);
      }
      setOutline('rgb(127,255,0)');
      setTimeout(() => {
        playSuccess();
        setOutline('');
        startNewGame();
      }, 1000);
    } else {
      if (!wrongAnswers.find(el => el === elem)) {
        wrongAnswers.push(elem);
        setWrongAnswers(wrongAnswers);
      }

      playFailure();
      setOutline('rgb(255,0,0)');
      setTimeout(() => {
        setOutline('');
      }, 1000);
    }
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    const target = event.target as Element;
    const guessElem = collection.find(el => el.id === target.id);
    const newState = deleteGuessElem(guessElem, collection);
    if (guess) {
      newState.push(guess);
    }
    setCollection(newState);
    setGuess(guessElem);
    triggerValidation(guessElem);
  };

  const onDragEnd = useCallback(
    result => {
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      switch (destination.droppableId) {
        case 'variants':
          if (source.droppableId === 'variants') {
            const newState = reorder(collection, source.index, destination.index);
            setCollection(newState);
          } else if (source.droppableId === 'phrase') {
            const updatedState = returnElementToList(guess, collection);
            const newState = reorder(collection, updatedState.length - 1, destination.index);
            setCollection(newState);
            setGuess(undefined);
          }
          break;
        case 'phrase':
          if (source.droppableId === 'phrase') {
            // перетаскиваем внутри phrase - ничего не происходит
          } else if (source.droppableId === 'variants') {
            // перетаскиваем из variants в phrase - меняем состояние + валидация
            const guessElem = collection.find(el => el.id === result.draggableId);
            const newState = deleteGuessElem(guessElem, collection);
            if (guess) {
              newState.push(guess);
            }
            setCollection(newState);
            setGuess(guessElem);
            triggerValidation(guessElem);
          }
          break;
        default:
          break;
      }
    },
    [collection, guess],
  );

  return (
    <div className="puzzle__screen box">
      <DragDropContext onDragEnd={onDragEnd}>
        <h2>Добавьте слово в фразу:</h2>
        <Phrase outline={outline} phrase={phrase} word={word} item={guess} />
        <h2>Перетащите подходящий вариант</h2>
        <Variants handleDoubleClick={handleDoubleClick} items={collection} />
      </DragDropContext>
    </div>
  );
};

export default GameScreen;
