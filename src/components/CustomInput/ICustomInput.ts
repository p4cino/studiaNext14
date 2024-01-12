import { ChangeEvent, FocusEvent, ReactNode } from 'react';

export interface ICustomInput {
  label: string;
  name: string;
  type?: string;
  icon?: ReactNode;
  step?: string;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
