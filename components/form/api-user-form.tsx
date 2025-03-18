"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormRelation from "../ui/form/form-relation";
import FormSwitch from "../ui/form/form-switch";
import FormFieldArray from "../ui/form/form-field-array";
import { secureFetch } from "@/secure-fetch";

export function ApiUserForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        admin: z.boolean().default(false).optional(),
        dependency: z.object({
            id: z.string(),
        }).nullable().optional(),
        roles: z.array(
            z.object({
                id: z.string().optional(),
                role: z.object({
                    id: z.string().nullable().optional(),
                }),
                apiUser: z.object({
                    id: z.string().nullable().optional()
                })
            })
        )
    });

    const onSubmit = async (values: any) => {
        const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify({
                ...(data?.id ? { id: data.id } : {}),
                dependency: values.dependency ? { id: values.dependency.id } : null,
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                admin: values.admin,
            })
        });

            for (const userRole of values.roles) {
                await secureFetch(`${apiUrl}/userRole${userRole?.id ? `/${userRole.id}` : ''}`, {
                    method: userRole?.id ? 'PATCH' : 'POST',
                    body: JSON.stringify({
                        ...(userRole.id ? { id: userRole.id } : {}),
                        apiUser: { id: response.data.id },
                        role: { id: userRole.role.id }
                    })
                });
            }

        return response;
    }

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} onSubmit={(values) => onSubmit(values)} defaultValues={{
            id: data?.id || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            username: data?.username || "",
            dependency: data?.dependency ? { id: data.dependency.id } : null,
            admin: data?.admin,
            roles: []
        }}>
            <FormInput name="firstName" label="Nombres" />
            <FormInput name="lastName" label="Apellidos" />
            <FormInput name="username" label="Correo electrónico (Usuario)" />
            <FormRelation name="dependency" module="dependency" label="Dependencia" apiUrl={apiUrl} />
            <FormSwitch name="admin" label="Modo administrador" description="Al activar el modo administrador, este usuario obtendrá control total sobre el sistema." />
            <FormFieldArray
                className="col-span-full"
                name="roles"
                label="Roles del usuario"
                columns={[]}
                fetchUrl={data?.id ? `${apiUrl}/userRole/search/user/${data?.id}` : undefined}
                defaultItem={{
                    id: "",
                    role: { id: null },
                    apiUser: { id: null }
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`roles.${index}.role`} module="role" />,
                ]}
            />
        </FormLayout>
    )
}