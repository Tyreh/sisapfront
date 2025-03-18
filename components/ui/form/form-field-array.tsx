'use client'

import React, { ReactNode, useEffect, useState } from "react";
import { useFormContext, useFieldArray, FieldValues, ArrayPath } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { nanoid } from "nanoid";
import { secureFetch } from "@/secure-fetch";

interface FieldArrayComponentProps<T extends FieldValues> {
    name: ArrayPath<T>;
    label: string;
    columns?: string[];
    className?: string;
    minItems?: number;
    cells: ((index: number) => ReactNode)[];
    /** Objeto con los valores iniciales para cada elemento del field array */
    defaultItem?: any;
    fetchUrl?: string;
}

const FormFieldArray = <T extends FieldValues>({
    name,
    label,
    columns = [],
    className,
    minItems = 0,
    cells,
    defaultItem, // nueva propiedad para los valores por defecto al agregar
    fetchUrl
}: FieldArrayComponentProps<T>) => {
    const { control, formState: { errors } } = useFormContext<T>();
    const { fields, append, remove } = useFieldArray({ control, name });
    const [fieldKeys, setFieldKeys] = useState<string[]>(fields.map(() => nanoid()));
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (!fetchUrl) return;
    
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await secureFetch(fetchUrl);
                if (Array.isArray(response.data)) {
                    response.data.forEach(item => {
                        const newItem = JSON.parse(JSON.stringify(defaultItem));
                        Object.keys(newItem).forEach(key => {
                            if (typeof newItem[key] === "object" && newItem[key] !== null) {
                                Object.keys(newItem[key]).forEach(subKey => {
                                    if (item[subKey] !== undefined) {
                                        newItem[key][subKey] = item[subKey];
                                    }
                                });
                            } else if (item[key] !== undefined) {
                                newItem[key] = item[key];
                            }
                        });
    
                        append(newItem);
                    });
    
                    setFieldKeys(prevKeys => [...prevKeys, ...response.data.map(() => nanoid())]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [fetchUrl, append, defaultItem]);
    

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

    if (loading) {
        return <div>cargando...</div>
    }

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
