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
    const { setValue, watch, formState: { errors } } = useFormContext<T>(); // Obtener contexto del formulario

    const selectedValue = watch(name); // Obtener el valor actual del formulario

    const handleSelect = (selectedItem: any) => {
        setValue(name, selectedItem); // Actualiza el valor en el formulario
    };

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <ViewRelationListTable
                    apiUrl={apiUrl}
                    module={module}
                    onSelect={handleSelect}
                    defaultOptionId={selectedValue?.id || undefined} // Pasar el valor seleccionado
                />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
    );
}




// import React from "react";
// import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Control, useController, FieldValues, Path } from "react-hook-form";
// import ViewRelationListTable from "@/components/view/relation/view-relation-list-table";

// type FormRelationType<T extends FieldValues> = {
//     control: Control<T>;
//     name: Path<T>;
//     module: string;
//     label?: string;
//     description?: string;
//     className?: string;
//     apiUrl: string;
// };

// export default function FormRelation<T extends FieldValues>({
//     control, className, label, description, name, module, apiUrl
// }: FormRelationType<T>) {
//     const { field, fieldState: { error } } = useController({ control, name });

//     const handleSelect = (selectedItem: any) => {
//         field.onChange(selectedItem);
//     };

//     return (
//         <FormItem className={className}>
//             {label && <FormLabel>{label}</FormLabel>}
//             <FormControl>
//                 <ViewRelationListTable
//                     apiUrl={apiUrl}
//                     module={module}
//                     onSelect={handleSelect}
//                 />
//             </FormControl>
//             {description && <FormDescription>{description}</FormDescription>}
//             {error && <FormMessage>{error.message}</FormMessage>}
//         </FormItem>
//     );
// }
