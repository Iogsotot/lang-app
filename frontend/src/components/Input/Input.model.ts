import React from 'react';

export interface InputProps {
  name: string;
  icon: string;
  type: 'email' | 'password' | 'text';
  value: string;
  success?: boolean;
  successText?: string;
  error?: boolean;
  errorText?: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
