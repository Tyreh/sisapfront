import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import ViewRelationListTable from "@/components/view/relation/view-relation-list-table";

type FormRelationType<T extends FieldValues> = {
    name: Path<T>;
    module: string;
    label?: string;
    description?: string;
    className?: string;
    selectLabel?: string;
    defaultLabel?: string;
};

export default function FormRelation<T extends FieldValues>({ className, label, description, name, module, defaultLabel }: FormRelationType<T>) {
    const { setValue, watch, formState: { errors } } = useFormContext<T>();

    const selectedValue = watch(name);
    // console.log("selectedValue", name, selectedValue); 


    const handleSelect = (selectedItem: any) => {
        setValue(name, selectedItem);
    };

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <ViewRelationListTable
                    module={module}
                    onSelect={handleSelect}
                    defaultLabel={defaultLabel}
                    selectedId={selectedValue}
                />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
    );
}