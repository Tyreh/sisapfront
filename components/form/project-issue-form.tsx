"use client";

import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormTextArea from "../ui/form/form-text-area";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFileInput from "../ui/form/form-file-input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { toast } from "@/hooks/use-toast";
import { secureFetch } from "@/secure-fetch";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


export interface FormBaseProps {
    apiUrl: string;
    module: string;
    projectId: string;
    data: any;
}

export function ProjectIssueForm({ apiUrl, module, data, projectId }: FormBaseProps) {
    const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const schema = z.object({
        id: z.string().optional(),
        title: z.string().min(1, "El título es obligatorio"),
        description: z.string().min(1, "La descripción es obligatoria"),
        files: z.array(
            z.custom<File>((file) => file instanceof File && allowedMimeTypes.includes(file.type), {
                message: "Solo se permiten archivos en formato .pdf, .doc, .docx, .xls o .xlsx",
            })
        ).optional(),
    });

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: data?.id || "",
            title: "",
            description: "",
            files: [],
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmit = async (data: any) => {
        setLoading(true);

        const response = await secureFetch(`${apiUrl}/projectIssue${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify({
                project: { id: projectId },
                name: data.title,
                description: data.description
            })
        });

        if (response.status !== 200) {
            if (response.errors) {
                response.errors.forEach((err: { field: string; message: string }) => {
                    form.setError(err.field, {
                        type: "server",
                        message: err.message
                    });
                });
            }

            const errorMessages =
                response.errors?.map((err: { message: string }) => `• ${err.message}`).join("<br>") ||
                response.message;

            toast({
                variant: "destructive",
                title: "¡Ups!",
                description: <div dangerouslySetInnerHTML={{ __html: errorMessages }} />,
                duration: 3000
            });

            setLoading(false);
            return;
        }

        router.push(`/dashboard/project/${projectId}`);
        router.refresh();

        setLoading(false);
    }

    return (
        <FormProvider {...form}>
            <Sheet>
                <SheetTrigger asChild>
                    {data?.id ?
                        <Card className="hover:cursor-pointer hover:scale-95 transition-transform duration-200 h-full">
                            <CardContent className="p-2 m-2">
                                <p className="font-semibold text-sm pb-4">{data.name}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">Creado el {data.createdAt}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-muted-foreground">{data.createdByApiUser?.fullName}</p>
                                        <Avatar className='h-8 w-8 rounded-lg ms-2'>
                                            <AvatarFallback className="rounded-lg">{`${data.createdByApiUser?.firstName?.charAt(0)}${data.createdByApiUser?.lastName?.charAt(0)}`}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                </div>

                            </CardContent>
                        </Card>
                        :
                        <Button>Cargar Avances</Button>
                    }
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Crear Incidencia</SheetTitle>
                        <SheetDescription>
                            Esta ventana te permite crear una nueva incidencia para registrar y detallar un evento relevante en el avance del proyecto.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                name="title"
                                label="Título"
                                className="col-span-full"
                                description="Ingresa un título breve que describa la incidencia en el avance del proyecto."
                            />
                            <FormTextArea
                                name="description"
                                label="Descripción"
                                className="col-span-full"
                                description="Describe en detalle la incidencia, proporcionando información relevante sobre su impacto y contexto dentro del avance del proyecto."
                            />
                            <FormFileInput
                                name="files"
                                className="col-span-full"
                                label="Adjuntos"
                                description="Sube archivos en formato PDF, Word o Excel."
                                multiple={true}
                                maxFiles={5}
                            />

                            <SheetFooter className="col-span-full">
                                <SheetClose asChild>
                                    <Button type="button" variant="secondary" className="w-full my-2">Cancelar</Button>
                                </SheetClose>
                                <Button type="submit" className="w-full my-2">Guardar</Button>

                            </SheetFooter>
                        </form>
                    </div>

                </SheetContent>
            </Sheet>

        </FormProvider>
    );
}
