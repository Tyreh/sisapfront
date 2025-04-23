"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormFieldArray from "../ui/form/form-field-array";
import FormRelation from "../ui/form/form-relation";

export function RoleForm({ module, data }: FormBaseProps) {
    const schema = z.object({
        name: z.string(),
        permissionIds: z.array(z.string()),
    });

    return (
        <FormLayout
            id={data?.id || undefined}
            module={module}
            schema={schema}
            defaultValues={{
                name: data?.name || "",
                permissionIds: data?.permissions?.map((permission: { id: number, name: string }) => permission.id) || []
            }}>
            <FormInput name="name" label="Nombre del rol" className="col-span-full" />
            <FormFieldArray
                name="permissionIds"
                label="Permisos"
                columns={[]}
                className="col-span-full"
                defaultItem={{ permission: null }}
                cells={[
                    (index) => <FormRelation name={`permissionIds.${index}`} module="permission" />,
                ]}
            />
        </FormLayout>
    )
}