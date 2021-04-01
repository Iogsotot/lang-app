import Word from '../Audiocall.model';

export interface FinishProps {
  playAudio: (arg: Word) => void;
  correctAnswers: Word[];
  wrongAnswers: Word[];
}
