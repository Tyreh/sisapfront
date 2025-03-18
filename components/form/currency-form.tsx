"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function CurrencyForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
        symbol: z.string()
    });

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{ id: data?.id || "", name: data?.name || "", symbol: data?.symbol || "" }}>
            <FormInput name="name" label="Nombre de la divisa" />
            <FormInput name="symbol" label="Símbolo de la divisa" />
        </FormLayout>
    )
}