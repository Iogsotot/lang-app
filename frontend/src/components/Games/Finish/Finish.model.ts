import { Word } from '../../../models/word';

export interface FinishProps {
  correctAnswers: Word[];
  wrongAnswers: Word[];
  score: number;
}
