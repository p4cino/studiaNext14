import { ChangeEvent, FC, FocusEvent } from 'react';
import { ErrorMessage } from 'formik';

import { Textarea } from '@material-tailwind/react';

interface ICustomTextarea {
  label: string;
  name: string;
  onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextarea: FC<ICustomTextarea> = ({ label, name, onBlur, value, onChange }) => (
  <>
    <Textarea label={label} name={name} onBlur={onBlur} value={value} onChange={onChange} />
    <ErrorMessage name={name} component="div" />
  </>
);

export default CustomTextarea;
