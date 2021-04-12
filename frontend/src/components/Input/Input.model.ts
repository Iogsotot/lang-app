import React from 'react';

export interface InputProps {
  placeholder: string;
  icon: string;
  type: 'email' | 'password' | 'text';
  value: string;
  successText?: string;
  errorText?: string;
  keyPressHandler: (event: React.KeyboardEvent) => void;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
