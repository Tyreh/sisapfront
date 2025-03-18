"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, FieldValues, Path, useController } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";

interface CustomFormDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    description?: string;
    className?: string;
}

const FormDatePicker = <T extends FieldValues>({
    name,
    label,
    description,
    className,
}: CustomFormDatePickerProps<T>) => {
    const { control } = useFormContext<T>();
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        field.value ? new Date(field.value) : undefined
    );

    useEffect(() => {
        if (field.value && typeof field.value === "string") {
            setSelectedDate(new Date(field.value)); // Convierte string a Date
        }
    }, [field.value]);

    const handleDateChange = (date?: Date) => {
        setSelectedDate(date);
        field.onChange(date); // Guarda el objeto Date directamente
    };

    return (
        <FormItem className={`flex flex-col ${className}`}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <DatePicker date={selectedDate} setDate={handleDateChange} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error.message as string}</FormMessage>}
        </FormItem>
    );
};

export default FormDatePicker;
