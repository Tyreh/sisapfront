"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import FormRelation from "@/components/ui/form/form-relation";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function DependencyForm({ module, data }: FormBaseProps) {
    const schema = z.object({
        name: z.string()
            .min(1, "Este campo es obligatorio")
            .max(80, "Este campo no puede exceder los 80 caracteres"),
        relatedDependencyId: z.string(),
        dependencyLeader: z.string()
            .max(80, "Este campo no puede exceder los 80 caracteres"),
    });

    return (
        <FormLayout module={module} schema={schema} defaultValues={{
            name: data?.name || "",
            relatedDependencyId: data?.relatedDependency?.id || "",
            dependencyLeader: data?.dependencyLeader || "",
        }}>
            <FormInput name="name" label="Nombre de la dependencia" className="col-span-full" />
            <FormRelation name="relatedDependencyId" label="Dependencia asociada" module="dependency" defaultLabel={data?.relatedDependency?.name || undefined} />
            <FormInput name="dependencyLeader" label="Líder de la dependencia" />
        </FormLayout>
    )
}