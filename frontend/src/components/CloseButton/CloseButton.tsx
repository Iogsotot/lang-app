import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { FC } from 'react';
import { CloseButtonProps } from './CloseButton.model';

import './Close.scss';

const closeIcon = faTimes as unknown as IconName;

const CloseButton: FC <CloseButtonProps> = ({ flag, callback }) => {
  const handleClick = () => {
    callback(flag);
  };
  return (
    <button onClick={handleClick} className='close-btn'>
      <FontAwesomeIcon className='close-btn__icon' icon={closeIcon}/>
    </button>

  );
};

export default CloseButton;
