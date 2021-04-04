import React, { useCallback, useEffect, useState, FC, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Word } from '../../../models/word';
import Phrase from './Phrase/Phrase';
import Variants from './Variants/Variants';
import './puzzle.scss';

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

const Puzzle: FC = () => {
  const [collection, setCollection] = useState<Word[]>([]);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<Word | undefined>(undefined);

  const triggerValidation = (elem: Word | undefined) => {
    if (elem?.word === word) {
      // alert('you are fucking right');
    } else {
      // alert('you wrong');
    }
  };

  useEffect(() => {
    fetch('https://rslang-2020q3.herokuapp.com/words/all?amount=5')
      .then(res => res.json())
      .then(res => {
        const firstElem = res[0];
        setPhrase(firstElem.textMeaning);
        setWord(firstElem.word);
        setCollection(res);
      });
  }, []);

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
            console.log(newState);
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
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <h2>phrase</h2>
        <Phrase phrase={phrase} word={word} item={guess} />
        <h2>variants</h2>
        <Variants items={collection} />
      </DragDropContext>
    </div>
  );
};

export default Puzzle;
