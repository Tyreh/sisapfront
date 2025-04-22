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

    const onSubmit = async (data: z.infer<typeof schema>) => {
        const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify({
                ...(data?.id ? { id: data.id } : {}),
                name: data.name
            })
        });

        if (response.status === 200) {
            console.log(data.permissions);
            for (const rolePermission of data.permissions) {
                console.log(rolePermission);
                await secureFetch(`${apiUrl}/rolePermission${rolePermission?.id ? `/${rolePermission.id}` : ''}`, {
                    method: rolePermission?.id ? 'PATCH' : 'POST',
                    body: JSON.stringify({
                        ...(rolePermission.id ? { id: rolePermission.id } : {}),
                        role: { id: response.data.id },
                        permission: { id: rolePermission.permission.id }
                    })
                });
            }
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
                fetchUrl={data?.id ? `${apiUrl}/rolePermission/search/role/${data?.id}` : undefined}
                className="col-span-full"
                defaultItem={{
                    id: "",
                    permission: { id: "" },
                    role: { id: "" },
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`permissions.${index}.permission`} module="permission" />,
                ]}
            />
        </FormLayout>
    )
}