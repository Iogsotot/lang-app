import { Word } from '../../../models/word';

export interface PuzzleProps {
  smth?: any;
}
export interface VariantsProps {
  items: Word[],
}
export interface PhraseProps {
  item: Word | undefined,
  phrase: string | null,
  word: string | null,
}
export interface GameScreenProps {
  group: number,
}
