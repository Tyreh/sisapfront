"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import FormRelation from "@/components/ui/form/form-relation";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function DependencyForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
        relatedDependency: z.object({
            id: z.string(),
        }).optional(),
        dependencyLeader: z.object({
            id: z.string(),
        }).optional(),
    });

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} defaultValues={{
            id: data?.id || "",
            name: data?.name || "",
            relatedDependency: data?.relatedDependency && { id: data.relatedDependency.id },
            dependencyLeader: data?.dependencyLeader && { id: data.dependencyLeader.id },
        }}>
            <FormInput name="name" label="Nombre" />
            <FormRelation apiUrl={apiUrl} name="relatedDependency" label="Dependencia asociada" module="dependency" />
            <FormRelation apiUrl={apiUrl} name="dependencyLeader" label="Líder" module="apiUser" />
        </FormLayout>
    )
}