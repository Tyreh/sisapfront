"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormFieldArray from "../ui/form/form-field-array";
import FormRelation from "../ui/form/form-relation";
import { secureFetch } from "@/secure-fetch";
import { useEffect } from "react";

export function RoleForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
        permissions: z.array(
            z.object({
                permission: z.object({
                    id: z.string().optional(),
                }),
            })
        ),
    });

    const onSubmit = async (data: any) => {
        const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify(data)
        });


    }

    const onUseEffect = async (form: any) => {
        const permissionResponse = await secureFetch(`${apiUrl}/rolePermission/role${data?.id ? `/${data.id}` : ''}}`);
        permissionResponse.data.forEach(permission => {
            form.setValue()
        });
    }

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{ id: data?.id || "", name: data?.name || "", symbol: data?.symbol || "" }}>
            <FormInput name="name" label="Nombre del rol" className="col-span-full" />
            <FormFieldArray
                name="permissions"
                label="Permisos"
                columns={[]}
                className="col-span-full"
                defaultItem={{
                    permission: { id: "" },
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`permission.${index}.permissions`} module="permission" />,
                ]}
            />
        </FormLayout>
    )
}