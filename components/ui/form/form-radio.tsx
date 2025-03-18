import React from 'react';
import { useFormContext, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CustomFormFieldProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    description?: string;
    className?: string;
    options: RadioOption[];
    orientation: Orientation;
}

export enum Orientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}

export interface RadioOption {
    label: string;
    value: string;
}

const FormRadio = <T extends FieldValues>({
    name,
    label,
    description,
    className,
    options,
    orientation,
}: CustomFormFieldProps<T>) => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext<T>();

    // Obtenemos el valor actual del campo.
    const value = watch(name);
    // Extraemos onChange del registro del campo.
    const { onChange } = register(name);

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup
                onValueChange={(val: string) => onChange({ target: { value: val } } as any)}
                value={value}
                className={`flex ${orientation === Orientation.VERTICAL ? 'flex-col space-y-1' : 'flex-row space-x-1'
                    }`}
            >
                {options.map((option) => (
                    <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                            <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">{option.label}</FormLabel>
                    </FormItem>
                ))}
            </RadioGroup>
            {description && <FormDescription>{description}</FormDescription>}
            {errors[name] && (
                <FormMessage>{(errors[name]?.message as string) || ''}</FormMessage>
            )}
        </FormItem>
    );
};

export default FormRadio;
