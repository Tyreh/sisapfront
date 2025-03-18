import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-input';
import { FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DropzoneOptions } from 'react-dropzone';
import { buttonVariants } from '@/components/ui/button';
import { Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from "next/image";
import React from 'react';
import { File } from 'lucide-react';

interface CustomFormFieldProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    description?: string;
    className?: string;
    maxFiles?: number;
    multiple: boolean;
    props?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormFileInput = <T extends FieldValues>({
    name,
    label,
    description,
    className,
    maxFiles,
    multiple,
    props,
}: CustomFormFieldProps<T>) => {
    const { control } = useFormContext<T>();
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    const dropzone = {
        multiple,
        maxFiles,
        maxSize: 4 * 1024 * 1024,
    } satisfies DropzoneOptions;

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    dropzoneOptions={dropzone}
                    reSelect={true}
                >
                    <FileInput className={cn(
                        buttonVariants({
                            size: "sm",
                            variant: "secondary"
                        }),
                        props,
                    )}>
                        <Paperclip className="size-4" />Cargar archivo
                    </FileInput>
                    {field.value && field.value.length > 0 && (
                        <FileUploaderContent>
                            {field.value.map((file: any, i: number) => (
                                <FileUploaderItem
                                    key={i}
                                    index={i}
                                    aria-roledescription={`file ${i + 1} containing ${file.name}`}
                                    className="p-4 size-14 flex flex-col items-center justify-center relative bg-gray-100 rounded-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16">
                                        <File className="w-16 h-16 text-gray-600" /> {/* Ícono grande */}
                                    </div>

                                </FileUploaderItem>
                            ))}
                        </FileUploaderContent>
                    )}
                </FileUploader>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
    );
};

export default FormFileInput;
