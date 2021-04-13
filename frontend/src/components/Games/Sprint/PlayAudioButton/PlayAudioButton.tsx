import { FC } from 'react';

import { PlayAudioButtonProps } from './PlayAudioButton.model';

const PlayAudioButton: FC<PlayAudioButtonProps> = ({ audio }) => {
  const clickHandler = () => {
    new Audio(audio).play();
  };

  return (
    <button className="play-audio-btn button is-rounded" onClick={clickHandler}>
      <i className="fas fa-play" />
    </button>
  );
};

export default PlayAudioButton;
