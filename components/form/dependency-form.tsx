"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import FormRelation from "@/components/ui/form/form-relation";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import { secureFetch } from "@/secure-fetch";

export function DependencyForm({ apiUrl, module, data }: FormBaseProps) {
    const schema = z.object({
        id: z.string().optional(),
        name: z.string(),
        relatedDependency: z.object({
            id: z.string(),
        }).nullable().optional(),
        dependencyLeader: z.object({
            id: z.string(),
        }).nullable().optional(),
    });

    const onSubmit = async (values: any) => {
        const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify({
                ...(data?.id ? { id: data.id } : {}),
                relatedDependency: values.relatedDependency ? { id: values.relatedDependency.id } : null,
                dependencyLeader: values.dependencyLeader ? { id: values.dependencyLeader.id } : null,
                name: values.name,
            })
        });

        return response;
    }

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={schema} onSubmit={(values) => onSubmit(values)} defaultValues={{
            id: data?.id || "",
            name: data?.name || "",
            relatedDependency: data?.relatedDependency && { id: data.relatedDependency.id },
            dependencyLeader: data?.dependencyLeader && { id: data.dependencyLeader.id },
        }}>
            <FormInput name="name" label="Nombre de la dependencia" className="col-span-full" />
            <FormRelation apiUrl={apiUrl} name="relatedDependency" label="Dependencia asociada" module="dependency" />
            <FormRelation apiUrl={apiUrl} name="dependencyLeader" label="Líder" module="apiUser" />
        </FormLayout>
    )
}