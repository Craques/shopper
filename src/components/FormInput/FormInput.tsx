import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { FormInputProps } from './FormInput.types';
import { Controller } from 'react-hook-form';

export const FormInput = ({
  label,
  placeholder,
  name,
  control,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => {
        return (
          <FormControl size="md" isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText className="text-secondary-500">
                {label}
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                className="text-secondary-500"
                placeholder={placeholder}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        );
      }}
    />
  );
};
