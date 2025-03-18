"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormRelation from "../ui/form/form-relation";

export function ApiUserForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        email: z.string(),
        dependency: z.object({
            id: z.string(),
        }, { required_error: "Este campo es obligatorio." }),
    });

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{
            id: data?.id || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            username: data?.username || "",
            email: data?.email || "",
            dependency: data?.dependency ? { id: data.dependency.id } : { id: "" },
        }}>
            <FormInput name="firstName" label="Nombres" />
            <FormInput name="lastName" label="Apellidos" />
            <FormInput name="email" label="Correo electrónico" />
            <FormRelation name="dependency" module="dependency" label="Dependencia" apiUrl={apiUrl} />
        </FormLayout>
    )
}