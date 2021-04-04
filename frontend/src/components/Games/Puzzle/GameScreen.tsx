import React, { useCallback, useEffect, useState, FC, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Word } from '../../../models/word';
import Phrase from './Phrase/Phrase';
import Variants from './Variants/Variants';
import './puzzle.scss';
import { API_BASE_URL } from '../../../constants/constants';
import { GameScreenProps } from './Puzzle.model';

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

const GameScreen = (props : GameScreenProps) => {
  const { group } = props;
  const [collection, setCollection] = useState<Word[]>([]);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<Word | undefined>(undefined);
  const [counter, setCounter] = useState(0);

  const startNewGame = () => {
    fetch(`${API_BASE_URL}/words/all?amount=5?group=${group}`)
      .then(res => res.json())
      .then(res => {
        const firstElem = res[0];
        setPhrase(firstElem.textMeaning);
        setWord(firstElem.word);
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
        alert('5th finished');
      }
      startNewGame();
    } else {
      //
    }
  };

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      switch (destination.droppableId) {
        case 'variants':
          if (source.droppableId === 'variants') {
            // перетаскиваем из variants в variants - реордеринг
            const newState = reorder(collection, source.index, destination.index);
            setCollection(newState);
          } else if (source.droppableId === 'phrase') {
            // перетаскиваем из phrase в variants - просто возвращаем элемент и обнуляем guess
            // const newState = reorder(collection, source.index, destination.index);

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
            const guessElem = collection.find((el) => el.id === result.draggableId);
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
        <Phrase phrase={phrase} word={word} item={guess} />
        <h2>Перетащите подходящий вариант</h2>
        <Variants items={collection} />
      </DragDropContext>
    </div>
  );
};

export default GameScreen;
