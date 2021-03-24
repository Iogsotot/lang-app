import { Word } from '../../models/word';

export interface WordCardProps extends Word {
  playHandler: (word: string) => void;
}
