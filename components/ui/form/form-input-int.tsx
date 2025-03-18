import React from 'react';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface CustomFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormInputInt = <T extends FieldValues>({ name, label, description, className, props }: CustomFormFieldProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input type='number' {...register(name, { valueAsNumber: true })} {...props} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {errors[name] && <FormMessage>{(errors[name]?.message as string) || ''}</FormMessage>}
    </FormItem>
  );
};

export default FormInputInt;
