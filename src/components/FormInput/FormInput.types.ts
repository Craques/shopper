import { Control } from 'react-hook-form';

export interface FormInputProps {
  label: string;
  placeholder: string;
  name: string;
  control: Control;
}
