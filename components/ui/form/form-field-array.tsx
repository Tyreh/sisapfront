import React, { ReactNode, useEffect, useState } from "react";
import { useFormContext, useFieldArray, FieldValues, ArrayPath } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { nanoid } from "nanoid";

interface FieldArrayComponentProps<T extends FieldValues> {
    name: ArrayPath<T>;
    label: string;
    columns?: string[];
    className?: string;
    minItems?: number;
    cells: ((index: number) => ReactNode)[];
    /** Objeto con los valores iniciales para cada elemento del field array */
    defaultItem?: any;
}

const FormFieldArray = <T extends FieldValues>({
    name,
    label,
    columns = [],
    className,
    minItems = 0,
    cells,
    defaultItem, // nueva propiedad para los valores por defecto al agregar
}: FieldArrayComponentProps<T>) => {
    const { control, formState: { errors } } = useFormContext<T>();
    const { fields, append, remove } = useFieldArray({ control, name });
    const [fieldKeys, setFieldKeys] = useState<string[]>(fields.map(() => nanoid()));

    useEffect(() => {
        setFieldKeys(fields.map(() => nanoid()));
    }, [fields.length]);

    const handleAppend = () => {
        append(defaultItem ?? {}); // se utiliza el objeto pasado o un objeto vacío
        setFieldKeys(prevKeys => [...prevKeys, nanoid()]);
    };

    const handleRemove = (index: number) => {
        remove(index);
        setFieldKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>
            <Card className="rounded-md">
                <CardContent className="p-0">
                    <Table>
                        <TableCaption>
                            {fields.length === 0 && <p className="pb-4">Aún no has agregado ningún elemento</p>}
                            {errors[name] && <FormMessage>{(errors[name]?.message as string) || ''}</FormMessage>}
                            <Button type="button" variant="secondary" className="w-full hover:bg-green-100 rounded-ss-none rounded-se-none" size="icon" onClick={handleAppend}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </TableCaption>

                        {columns.length > 0 && (
                            <TableHeader>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableHead key={nanoid()}>{column}</TableHead>
                                    ))}
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                        )}

                        <TableBody>
                            {fields.map((_, index) => (
                                <TableRow key={fieldKeys[index]} className="hover:bg-inherit">
                                    {cells.map((cellRenderer, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            {cellRenderer(index)}
                                        </TableCell>
                                    ))}
                                    {index >= minItems && (
                                        <TableCell className="w-[10px]">
                                            <Button type="button" className="hover:bg-red-100" size="icon" variant="secondary" onClick={() => handleRemove(index)}>
                                                <Minus size={18} />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default FormFieldArray;


// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { ReactNode, useState, useEffect } from "react";
// import { FormMessage } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Plus, Minus } from "lucide-react";
// import { nanoid } from "nanoid";

// export interface FieldArrayComponentCellRendererProps<TField> {
//     index: number;
//     field: TField;
// }

// interface FieldArrayComponentProps<TField> {
//     readonly label: string;
//     readonly columns?: string[];
//     readonly fields: TField[];
//     readonly append: (value: Partial<TField>) => void;
//     readonly remove: (index: number) => void;
//     readonly cells: ((props: FieldArrayComponentCellRendererProps<TField>) => ReactNode)[];
//     readonly className?: string;
//     readonly error?: any;
//     readonly minItems?: number;
// }

// function FormFieldArray<TField>({
//     label,
//     columns = [],
//     fields,
//     append,
//     remove,
//     cells,
//     className,
//     error,
//     minItems = -1
// }: FieldArrayComponentProps<TField>) {
//     const [fieldKeys, setFieldKeys] = useState<string[]>([]);

//     useEffect(() => {
//         setFieldKeys(fields.map(() => nanoid()));
//     }, [fields]);

//     const handleAppend = () => {
//         if (append) {
//             append({} as Partial<TField>);
//             setFieldKeys(prevKeys => [...prevKeys, nanoid()]);
//         }
//     };

//     const handleRemove = (index: number) => {
//         if (remove) {
//             remove(index);
//             setFieldKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
//         }
//     };

//     return (
//         <div className={className}>
//             <Card>
//                 <CardHeader>
//                     <Label>{label}</Label>
//                 </CardHeader>

//                 <CardContent>
//                     <Table>
//                         <TableCaption>
//                             {fields.length === 0 && <p className="py-6">Aún no has agregado ningún elemento</p>}
//                             {error && <FormMessage>{error.message}</FormMessage>}
//                             <Button type="button" variant="secondary" className="w-full hover:bg-green-100" size="icon" onClick={handleAppend}>
//                                 <Plus className="w-4 h-4" />
//                             </Button>
//                         </TableCaption>

//                         {columns.length > 0 &&
//                             <TableHeader>
//                                 <TableRow className="hover:bg-inherit">
//                                     {columns.map(column =>
//                                         <TableHead key={nanoid()} className="ps-0">
//                                             {column}
//                                         </TableHead>
//                                     )}
//                                 </TableRow>
//                             </TableHeader>
//                         }
//                         <TableBody>
//                             {
//                                 fields.map((field, index) =>
//                                     <TableRow key={fieldKeys[index]} className="hover:bg-inherit">
//                                         {
//                                             cells.map((cellRenderer, cellIndex) =>
//                                                 <TableCell key={cellIndex} className="ps-0">
//                                                     {
//                                                         cellRenderer({ index, field })
//                                                     }
//                                                 </TableCell>
//                                             )
//                                         }
//                                         {(index + 1) > minItems &&
//                                             <TableCell className="w-[10px] p-0 m-0">
//                                                 <Button type="button" className="hover:bg-red-100" size="icon" variant="secondary" onClick={() => handleRemove(index)}>
//                                                     <Minus size={18} />
//                                                 </Button>
//                                             </TableCell>
//                                         }
//                                     </TableRow>
//                                 )
//                             }
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// export default FormFieldArray;