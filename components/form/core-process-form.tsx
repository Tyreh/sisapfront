"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function CoreProcessForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
    });

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{ id: data?.id || "", name: data?.name || "" }}>
            <FormInput name="name" label="Nombre" className="col-span-full" />
        </FormLayout>
    )
}