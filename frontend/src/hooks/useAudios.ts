import { useState, useEffect } from 'react';
import { WordAudioItem } from '../components/WordList/types';

export const useAudios = (audios: WordAudioItem[]) => {
  const list = [...audios];
  const [currentWord, setCurrentWord] = useState<WordAudioItem>();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement>();
  const [audioIndex, setAudioIndex] = useState(0);

  const startAudio = (word: string) => {
    const current = list.find((wordObj) => wordObj.word === word)!;
    const audio = new Audio(current.audios[audioIndex]);
    setCurrentWord(current);

    if (currentAudio) {
      currentAudio.currentTime = 0;
      audio.play();
      setAudioIndex(audioIndex + 1);
    }

    setCurrentAudio(audio);
  };

  const playNext = () => {
    if (audioIndex < 3 && currentWord) {
      startAudio(currentWord?.word);
    } else {
      setAudioIndex(0);
    }
  };

  const continueAudio = () => {};

  const pauseAudio = () => {};

  useEffect(() => {
    if (currentAudio) {
      currentAudio.addEventListener('ended', playNext);
    }
    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('ended', playNext);
      }
    };
  }, [currentAudio]);

  return {
    startAudio,
    continueAudio,
    pauseAudio,
  };
};
