'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFormContext, useFieldArray, FieldValues, ArrayPath } from "react-hook-form";
import React, { ReactNode, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
    // const [fieldKeys, setFieldKeys] = useState<string[]>(fields.map(() => nanoid()));


    useEffect(() => {
        append(defaultItem);
    }, [append, defaultItem]);

    // useEffect(() => {
    //     setFieldKeys(fields.map(() => nanoid()));
    // }, [fields, fields.length]);

    const handleAppend = () => {
        append(defaultItem ?? {}); // se utiliza el objeto pasado o un objeto vacío
        // setFieldKeys(prevKeys => [...prevKeys, nanoid()]);
    };

    const handleRemove = (index: number) => {
        remove(index);
        // setFieldKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
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
                                    <TableHead></TableHead>2
                                </TableRow>
                            </TableHeader>
                        )}

                        <TableBody>
                            {fields.map((_, index) => (
                                // <TableRow key={fieldKeys[index]} className="hover:bg-inherit">
                                <TableRow key={nanoid()} className="hover:bg-inherit">
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