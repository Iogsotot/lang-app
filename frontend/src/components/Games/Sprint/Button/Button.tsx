import { FC } from 'react';

import { ButtonProps } from './Button.model';

const Button: FC<ButtonProps> = ({ props, onBtnClick, text, className }) => {
  const handleClick = () => {
    onBtnClick(props);
  };

  return (
    <button onClick={handleClick} className={`button ${className}`}>{text}</button>
  );
};

export default Button;
