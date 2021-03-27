import { useState, useEffect } from 'react';
import { Word } from '../models/word';

interface UseAudiosHook {
  setAudio: (word: string) => void;
  toggleAudio: () => void;
  currentWord: string;
  isPlaying: boolean;
}

export const useAudios = (data: Word[]): UseAudiosHook => {
  const audios = data.map(({ word, audio, audioExample, audioMeaning }) => ({
    word,
    audios: [audio, audioMeaning, audioExample],
  }));
  const [current, setCurrent] = useState({
    word: '',
    audios: [''],
  });
  const [audioItem, setAudioItem] = useState<HTMLAudioElement | null>();
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const checkIsItPlayingForFixError = () => {
    if (audioItem) {
      return audioItem.currentTime > 0 && !audioItem.paused && !audioItem.ended
        && audioItem.readyState > 2;
    }

    return false;
  };

  const play = () => {
    if (audioItem) {
      audioItem.play();
      setIsPlaying(true);
    }
  };

  const setAudio = (word: string) => {
    const currentWord = audios.find((wordObj) => wordObj.word === word);
    const check = checkIsItPlayingForFixError();

    if (isPlaying && audioItem && check) {
      audioItem.pause();
      audioItem.currentTime = 0;
      setAudioIndex(0);
    }

    if (currentWord) {
      setCurrent(currentWord);
      setAudioItem(new Audio(currentWord.audios[0]));
    }
  };

  const playNext = () => {
    if (audioIndex >= 2) {
      setAudioIndex(0);
      setIsPlaying(false);
      setAudioItem(null);
    } else {
      setAudioIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setAudioItem(new Audio(current.audios[newIndex]));

        return newIndex;
      });
    }
  };

  useEffect(() => {
    play();
    audioItem?.addEventListener('ended', playNext);
    return () => audioItem?.removeEventListener('ended', playNext);
  }, [audioItem]);

  const toggleAudio = () => {
    const check = checkIsItPlayingForFixError();
    if (isPlaying && check) {
      audioItem?.pause();
      setIsPlaying(false);
    } else {
      audioItem?.play();
      setIsPlaying(true);
    }
  };

  return {
    setAudio,
    toggleAudio,
    isPlaying,
    currentWord: current.word,
  };
};
