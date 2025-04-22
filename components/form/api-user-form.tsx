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
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        admin: z.boolean().default(false).optional(),
        dependencyId: z.string(),
        roleIds: z.array(z.string()),
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log(values)
        // const response = await secureFetch(`/${module}${data?.id ? `/${data.id}` : ''}`, {
        //     method: data?.id ? 'PATCH' : 'POST',
        //     body: JSON.stringify({
        //         ...(data?.id ? { id: data.id } : {}),
        //         dependency: values.dependency ? { id: values.dependency.id } : null,
        //         username: values.username,
        //         firstName: values.firstName,
        //         lastName: values.lastName,
        //         admin: values.admin,
        //     })
        // });

        // if (response.status === 200) {

        //     for (const userRole of values.roles) {
        //         await secureFetch(`${apiUrl}/userRole${userRole?.id ? `/${userRole.id}` : ''}`, {
        //             method: userRole?.id ? 'PATCH' : 'POST',
        //             body: JSON.stringify({
        //                 ...(userRole.id ? { id: userRole.id } : {}),
        //                 apiUser: { id: response.data.id },
        //                 role: { id: userRole.role.id }
        //             })
        //         });
        //     }
        // }
        // return response;
    }

    return (
        <FormLayout
            module={module}
            schema={schema}
            onSubmit={(values) => onSubmit(values)}
            defaultValues={{
                firstName: data?.firstName || "",
                lastName: data?.lastName || "",
                username: data?.username || "",
                dependencyId: data?.dependencyId || "",
                admin: data?.admin,
                roleIds: data?.roles?.map((role: { id: number, name: string }) => role.id) || []
            }}
        >

            <FormInput name="firstName" label="Nombres" />
            <FormInput name="lastName" label="Apellidos" />
            <FormInput name="username" label="Correo electrónico (Usuario)" />
            <FormRelation name="dependency" module="dependency" label="Dependencia" />
            <FormSwitch name="admin" label="Modo administrador" description="Al activar el modo administrador, este usuario obtendrá control total sobre el sistema." />
            <FormFieldArray
                className="col-span-full"
                name="roles"
                label="Roles del usuario"
                columns={[]}
                defaultItem={{
                    id: "",
                    role: { id: null },
                    apiUser: { id: null }
                }}
                cells={[
                    (index) => <FormRelation name={`roles.${index}.role`} module="role" />,
                ]}
            />
        </FormLayout>
    )
}