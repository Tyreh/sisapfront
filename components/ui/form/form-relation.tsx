import React from "react";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import ViewRelationListTable from "@/components/view/relation/view-relation-list-table";

type FormRelationType<T extends FieldValues> = {
    name: Path<T>;
    module: string;
    label?: string;
    description?: string;
    className?: string;
    apiUrl: string;
};

export default function FormRelation<T extends FieldValues>({
    className, label, description, name, module, apiUrl
}: FormRelationType<T>) {
    const { setValue, watch, formState: { errors } } = useFormContext<T>(); 

    const selectedValue = watch(name);

    const handleSelect = (selectedItem: any) => {
        setValue(name, selectedItem); 
    };

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <ViewRelationListTable
                    apiUrl={apiUrl}
                    module={module}
                    onSelect={handleSelect}
                    defaultOptionId={selectedValue?.id || undefined} 
                />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
    );
}