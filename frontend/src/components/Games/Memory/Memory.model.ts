import { Word } from '../../../models/word';

export interface MemoryProps {
  smt?: any,
}
export interface MemoryCardProps {
  id: string,
  textMeaning: string,
  selected: boolean,
  word: string,
  won: boolean,
  onSelection: (el: any) => void,
}
