import React from 'react';
import { Word } from '../../../models/word';

export interface VariantsProps {
  items: Word[],
  handleDoubleClick: (event: React.MouseEvent) => void,
}
export interface PhraseProps {
  outline: string,
  item: Word | undefined,
  phrase: string | null,
  word: string | null,
}
export interface GameScreenProps {
  group: number,
  setGameFinished: (el: boolean) => void,
  setWrongAnswers: (el: any) => void,
  setCorrectAnswers: (el: any) => void,
}
