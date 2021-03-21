import { FC } from 'react';

import { ButtonProps } from './Button.model';

const Button: FC<ButtonProps> = ({ answer, onBtnClick, text, className }) => {
  const handleClick = () => {
    onBtnClick(answer);
  };

  return (
    <button onClick={handleClick} className={`button ${className}`}>{text}</button>
  );
};

export default Button;
