"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormRelation from "../ui/form/form-relation";
import FormSwitch from "../ui/form/form-switch";
import FormFieldArray from "../ui/form/form-field-array";

export function ApiUserForm({ module, data }: FormBaseProps) {
    const schema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        admin: z.boolean().default(false).optional(),
        dependencyId: z.string(),
        roleIds: z.array(z.string()),
    });


    return (
        <FormLayout
            id={data?.id || undefined}
            module={module}
            schema={schema}
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
            <FormRelation name="dependencyId" module="dependency" label="Dependencia" defaultLabel={data?.dependency?.name || undefined} />
            <FormSwitch name="admin" label="Modo administrador" description="Al activar el modo administrador, este usuario obtendrá control total sobre el sistema." />
            <FormFieldArray
                className="col-span-full"
                name="roleIds"
                label="Roles del usuario"
                columns={[]}
                defaultItem={{ role: null }}
                cells={[
                    (index) => <FormRelation name={`roleIds.${index}`} module="role" />,
                ]}
            />
        </FormLayout>
    )
}