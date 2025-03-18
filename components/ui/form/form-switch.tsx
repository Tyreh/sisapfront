import React from 'react';
import { useFormContext, FieldValues, Path, useController } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface CustomFormSwitchProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    description?: string;
    className?: string;
    props?: React.ComponentProps<typeof Switch>;
}

const FormSwitch = <T extends FieldValues>({
    name,
    label,
    description,
    className,
    props,
}: CustomFormSwitchProps<T>) => {
    const { control } = useFormContext<T>();
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    return (
        <FormItem className={`flex items-center ${className}`}>
            <FormControl>
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...props}
                    />
                    {label && <FormLabel>{label}</FormLabel>}
                </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error.message as string}</FormMessage>}
        </FormItem>
    );
};

export default FormSwitch;
