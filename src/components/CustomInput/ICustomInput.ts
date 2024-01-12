import React from 'react';

export interface ICustomInput {
  label: string;
  name: string;
  type?: string;
  icon?: React.ReactNode;
  step?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
