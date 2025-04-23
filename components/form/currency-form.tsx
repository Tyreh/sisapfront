"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function CurrencyForm({ module, data }: FormBaseProps) {
    const schema = z.object({
        name: z.string()
    });

    return (
        <FormLayout
            id={data?.id || undefined}
            module={module}
            schema={schema}
            defaultValues={{ name: data?.name || "" }}
        >
            <FormInput name="name" label="Nombre de la divisa" className="col-span-full" />
        </FormLayout>
    )
}