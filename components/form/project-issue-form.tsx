"use client"

import { z } from "zod";
import { FormLayout } from "../ui/form/form-layout";
import FormTextArea from "../ui/form/form-text-area";
import FormFileInput from "../ui/form/form-file-input";
import React from "react";
import FormInput from "@/components/ui/form/form-input";
import { secureFetch } from "@/secure-fetch";
import FormFieldArray from "../ui/form/form-field-array";

interface Props {
    projectId: string;
}

export function ProjectIssueForm({ projectId }: Props) {
    const schema = z.object({
        name: z.string().min(1, { message: "El nombre es obligatorio" }),
        description: z.string().min(1, { message: "La descripción es obligatoria" }),
        files: z.array(z.any()).optional() // validaremos después si es necesario
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const formData = new FormData();
        const { files: rawFiles, name, description } = values;

        // Convertir FileList o File a File[]
        const files = (rawFiles || [])
            .map(item => item instanceof FileList ? item[0] : item)
            .filter((f): f is File => f instanceof File);


        // Construir el DTO con issues[]
        const issueDto = {
            name,
            description,
            fileNames: files.map(f => f.name)
        };
        const projectDto = {
            issues: [issueDto]
        };

        // Anexar el JSON
        formData.append(
            "projectDto",
            new Blob([JSON.stringify(projectDto)], {
                type: "application/json"
            })
        );

        // Anexar los archivos
        files.forEach(file => {
            formData.append("files", file);
        });

        // Llamada
        const response = await secureFetch(
            `/project/${projectId}/updateWithFiles`,
            {
                method: "PATCH",
                body: formData,
                disableContentType: true
            }
        );
        return response;
    };


    return (
        <FormLayout
            module={"project"}
            schema={schema}
            onSubmit={onSubmit}
            defaultValues={{
                name: "",
                description: "",
                files: []
            }}>
            <FormInput
                name="name"
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

            <FormFieldArray
                className="col-span-full"
                name="files"
                label="Adjuntos"
                columns={[]}
                defaultItem={{ file: null }}
                cells={[
                    (index) => <FormInput name={`files.${index}`} props={{ type: "file" }} />,
                ]}
            />

        </FormLayout>
    )
}