import { FC } from 'react';

import { ButtonProps } from './Button.model';

const Button: FC<ButtonProps> = ({ onBtnClick, text, className, icon }) => {
  const handleClick = () => {
    onBtnClick();
  };

  const leftIcon = icon === 'arrow-left' && (
    <span className="icon is-small">
      <i className="fas fa-arrow-left" />
    </span>
  );

  const rightIcon = icon === 'arrow-right' && (
    <span className="icon is-small">
      <i className="fas fa-arrow-right" />
    </span>
  );

  return (
    <button onClick={handleClick} className={`button ${className}`}>
      {leftIcon}
      <span>{text}</span>
      {rightIcon}
    </button>
  );
};

export default Button;
