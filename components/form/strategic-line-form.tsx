"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormTextArea from "../ui/form/form-text-area";

export function StrategicLineForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
        startYear: z.string().transform((val) => Number(val)).or(z.number()),
        endYear: z.string().transform((val) => Number(val)).or(z.number()),
        description: z.string(),
    });

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{
            id: data?.id || "",
            name: data?.name || "",
            description: data?.description || "",
            startYear: data?.startYear || undefined,
            endYear: data?.endYear || undefined
        }}>
            <FormInput name="name" label="Nombre" className="col-span-full" />
            <FormInput name="startYear" label="Año de inicio" props={{ type: "number" }} />
            <FormInput name="endYear" label="Año de fin" props={{ type: "number" }} />
            <FormTextArea name="description" label="Descripción" className="col-span-full" />
        </FormLayout>
    )
}