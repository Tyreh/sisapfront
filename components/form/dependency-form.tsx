"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import FormRelation from "@/components/ui/form/form-relation";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function DependencyForm({ module, data }: FormBaseProps) {
    const schema = z.object({
        name: z.string(),
        relatedDependencyId: z.string(),
        leaderId: z.string(),
    });

    return (
        <FormLayout module={module} schema={schema} defaultValues={{
            name: data?.name || "",
            relatedDependencyId: data?.relatedDependency?.id || "",
            leaderId: data?.leader?.id || "",
        }}>
            <FormInput name="name" label="Nombre de la dependencia" className="col-span-full" />
            <FormRelation name="relatedDependencyId" label="Dependencia asociada" module="dependency" defaultLabel={data?.relatedDependency?.name || undefined} />
            <FormRelation name="leaderId" label="Líder" module="apiUser" defaultLabel={data?.leader?.fullName || undefined} />
        </FormLayout>
    )
}