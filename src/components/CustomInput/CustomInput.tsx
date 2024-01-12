import { FC } from 'react';
import { ErrorMessage } from 'formik';

import { Input } from '@material-tailwind/react';

import { ICustomInput } from '@/components/CustomInput/ICustomInput';

const CustomInput: FC<ICustomInput> = ({
  label,
  name,
  type = 'text',
  icon,
  step,
  onBlur,
  value,
  onChange,
}) => (
  <>
    <Input
      variant="static"
      size="lg"
      label={label}
      name={name}
      crossOrigin=""
      type={type}
      step={step}
      icon={icon}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
    />
    <ErrorMessage name={name} component="div" />
  </>
);

export default CustomInput;
