"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormFieldArray from "../ui/form/form-field-array";
import FormRelation from "../ui/form/form-relation";
import { secureFetch } from "@/secure-fetch";

export function RoleForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
        permissions: z.array(
            z.object({
                id: z.string().optional(),
                permission: z.object({
                    id: z.string().optional(),
                }),
                role: z.object({
                    id: z.string().optional(),
                })
            })
        ),
    });

    const onSubmit = async (data: any) => {
        const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify({
                ...(data?.id ? { id: data.id } : {}),
                name: data.name
            })
        });

        for (const permission of data.permissions) {
            await secureFetch(`${apiUrl}/rolePermission${permission?.id ? `/${permission.id}` : ''}`, {
                method: permission?.id ? 'PATCH' : 'POST',
                body: JSON.stringify({
                    ...(permission.id ? { id: permission.id } : {}),
                    role: { id: response.data.id },
                    permission: { id: permission.permission.id }
                })
            });
        }

        return response;
    }

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{ id: data?.id || "", name: data?.name || "", permissions: [] }} onSubmit={(data) => onSubmit(data)}>
            <FormInput name="name" label="Nombre del rol" className="col-span-full" />
            <FormFieldArray
                name="permissions"
                label="Permisos"
                columns={[]}
                fetchUrl={`${apiUrl}/userRole/role/${data?.id}`}
                className="col-span-full"
                defaultItem={{
                    id: "",
                    permission: { id: "" },
                    role: { id: "" },
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`permission.${index}.permissions`} module="permission" />,
                ]}
            />
        </FormLayout>
    )
}