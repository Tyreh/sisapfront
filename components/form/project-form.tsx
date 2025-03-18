"use client"

import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormRelation from "../ui/form/form-relation";
import { FormLayout } from "../ui/form/form-layout";
import FormTextArea from "../ui/form/form-text-area";
import FormInputInt from "../ui/form/form-input-int";
import FormFieldArray from "../ui/form/form-field-array";
import { secureFetch } from "@/secure-fetch";
import FormDatePicker from "../ui/form/form-date-picker";
import { format, parse } from "date-fns";
import { FormBaseProps } from "./project-issue-form";

export function ProjectForm({ apiUrl, module, data }: FormBaseProps) {
    const Schema = z.object({
        id: z.string().optional(),
        name: z.string()
            .max(80, "Este campo es obligatorio.")
            .min(1, "Este campo es obligatorio."),
        backgroundDetails: z.string(),
        targetPopulationScope: z.string(),
        description: z.string(),
        scope: z.string(),
        cost: z.number(),
        currency: z.object({
            id: z.string(),
        }),
        strategicLine: z.object({
            id: z.string(),
        }),
        coreProcess: z.object({
            id: z.string(),
        }),
        projectStatus: z.object({
            id: z.string(),
        }),
        estimatedStartDate: z.date().nullable().optional(),
        estimatedEndDate: z.date().nullable().optional(),
        members: z.array(
            z.object({
                id: z.string().optional(),
                apiUser: z.object({
                    id: z.string().optional(),
                }),
                project: z.object({
                    id: z.string().optional()
                })
            })
        )
    });

    const onSubmit = async (values: any) => {
        console.log(values);

        const formattedStartDate = values.estimatedStartDate
            ? format(new Date(values.estimatedStartDate), "dd/MM/yyyy")
            : "";
        const formattedEndDate = values.estimatedEndDate
            ? format(new Date(values.estimatedEndDate), "dd/MM/yyyy")
            : "";

        const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
            method: data?.id ? 'PATCH' : 'POST',
            body: JSON.stringify({
                ...(data?.id ? { id: data.id } : {}),
                currency: values.currency ? { id: values.currency.id } : null,
                strategicLine: values.strategicLine ? { id: values.strategicLine.id } : null,
                coreProcess: values.coreProcess ? { id: values.coreProcess.id } : null,
                projectStatus: values.projectStatus ? { id: values.projectStatus.id } : null,
                name: values.name,
                backgroundDetails: values.backgroundDetails,
                targetPopulationScope: values.targetPopulationScope,
                estimatedStartDate: formattedStartDate,
                estimatedEndDate: formattedEndDate,
                description: values.description,
                scope: values.scope,
                cost: values.cost,
            })
        });

        for (const member of values.members) {
            await secureFetch(`${apiUrl}/projectApiUser${member?.id ? `/${member.id}` : ''}`, {
                method: member?.id ? 'PATCH' : 'POST',
                body: JSON.stringify({
                    ...(member.id ? { id: member.id } : {}),
                    project: { id: response.data.id },
                    apiUser: { id: member.apiUser.id }
                })
            });
        }

        return response;
    }


    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={Schema} onSubmit={(values) => onSubmit(values)} defaultValues={{
            id: data?.id || "",
            name: data?.name || "",
            backgroundDetails: data?.backgroundDetails || "",
            targetPopulationScope: data?.targetPopulationScope || "",
            description: data?.description || "",
            scope: data?.scope || "",
            cost: data?.cost || 0,
            currency: data?.currency ? { id: data.currency.id } : { id: "" },
            strategicLine: data?.strategicLine ? { id: data.strategicLine.id } : { id: "" },
            coreProcess: data?.coreProcess ? { id: data.coreProcess.id } : { id: "" },
            projectStatus: data?.projectStatus ? { id: data.projectStatus.id } : { id: "" },
            estimatedStartDate: data?.estimatedStartDate
                ? parse(data.estimatedStartDate, "dd/MM/yyyy", new Date())
                : null,
            estimatedEndDate: data?.estimatedEndDate
                ? parse(data.estimatedEndDate, "dd/MM/yyyy", new Date())
                : null,
            members: [],
        }}>
            <FormInput name="name" label="Nombre del proyecto" className="col-span-full" />
            <FormTextArea name="description" label="Descripción del proyecto" className="col-span-full" />
            <FormTextArea name="backgroundDetails" label="Antecedentes" className="col-span-full" />
            <FormTextArea name="targetPopulationScope" label="Grupo de población a impactar" className="col-span-full" />
            <FormTextArea name="scope" label="Alcance" className="col-span-full" />
            <FormRelation apiUrl={apiUrl} name="currency" label="Divisa" module="currency" />
            <FormInputInt name="cost" label="Costo" props={{ type: "number" }} />
            <FormRelation apiUrl={apiUrl} name="strategicLine" label="Línea estratégica" module="strategicLine" />
            <FormRelation apiUrl={apiUrl} name="coreProcess" label="Proceso misional" module="coreProcess" />
            <FormDatePicker name="estimatedEndDate" label="Fecha de inicio estimada" />
            <FormDatePicker name="estimatedStartDate" label="Fecha de finalización estimada" />

            <FormRelation apiUrl={apiUrl} name="projectStatus" label="Estado" module="projectStatus" />
            <FormFieldArray
                className="col-span-full"
                name="members"
                label="Miembros del proyecto"
                columns={[]}
                defaultItem={{
                    id: "",
                    apiUser: { id: "" },
                    project: { id: "" }
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`members.${index}.apiUser`} module="apiUser" />,
                ]}
            />
        </FormLayout>
    )
}