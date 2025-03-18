import React from 'react';
import { useFormContext, FieldValues, Path, useController } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomFormSelectProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    description?: string;
    className?: string;
    options: SelectOption[];
    props?: React.ComponentProps<typeof Select>;
}

const FormSelect = <T extends FieldValues>({
    name,
    label,
    description,
    className,
    options,
    props,
}: CustomFormSelectProps<T>) => {
    const { control } = useFormContext<T>();
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <Select value={field.value} onValueChange={field.onChange} {...props}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error.message as string}</FormMessage>}
        </FormItem>
    );
};

export default FormSelect;
