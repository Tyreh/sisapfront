"use client"

import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormRelation from "../ui/form/form-relation";
import { FormLayout } from "../ui/form/form-layout";
import FormTextArea from "../ui/form/form-text-area";
import FormInputInt from "../ui/form/form-input-int";
import FormDatePicker from "../ui/form/form-date-picker";
import { parse } from "date-fns";
import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import FormSwitch from "../ui/form/form-switch";

export function ProjectForm({ module, data }: FormBaseProps) {
    const schema = z.object({
        name: z.string(),
        backgroundDetails: z.string(),
        targetPopulationScope: z.string(),
        description: z.string(),
        scope: z.string(),
        cost: z.number(),
        currencyId: z.string(),
        strategicLineId: z.string(),
        coreProcessId: z.string(),
        estimatedStartDate: z.date().nullable().optional(),
        estimatedEndDate: z.date().nullable().optional(),
        finished: z.boolean().default(false),
    });

    // const onSubmit = async (values: z.infer<typeof schema>) => {
    //     const formattedStartDate = values.estimatedStartDate
    //         ? format(new Date(values.estimatedStartDate), "dd/MM/yyyy")
    //         : "";
    //     const formattedEndDate = values.estimatedEndDate
    //         ? format(new Date(values.estimatedEndDate), "dd/MM/yyyy")
    //         : "";

    //     const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
    //         method: data?.id ? 'PATCH' : 'POST',
    //         body: JSON.stringify({
    //             ...(data?.id ? { id: data.id } : {}),
    //             currency: values.currency ? { id: values.currency.id } : null,
    //             strategicLine: values.strategicLine ? { id: values.strategicLine.id } : null,
    //             coreProcess: values.coreProcess ? { id: values.coreProcess.id } : null,
    //             projectStatus: values.projectStatus ? { id: values.projectStatus.id } : null,
    //             name: values.name,
    //             backgroundDetails: values.backgroundDetails,
    //             targetPopulationScope: values.targetPopulationScope,
    //             estimatedStartDate: formattedStartDate,
    //             estimatedEndDate: formattedEndDate,
    //             description: values.description,
    //             scope: values.scope,
    //             cost: values.cost,
    //         })
    //     });

    //     for (const member of values.members) {
    //         await secureFetch(`${apiUrl}/projectApiUser${member?.id ? `/${member.id}` : ''}`, {
    //             method: member?.id ? 'PATCH' : 'POST',
    //             body: JSON.stringify({
    //                 ...(member.id ? { id: member.id } : {}),
    //                 project: { id: response.data.id },
    //                 apiUser: { id: member.apiUser.id }
    //             })
    //         });
    //     }

    //     return response;
    // }


    return (
        <FormLayout
            id={data?.id || undefined}
            module={module}
            schema={schema}
            // onSubmit={(values) => onSubmit(values)}
            defaultValues={{
                name: data?.name || "",
                backgroundDetails: data?.backgroundDetails || "",
                targetPopulationScope: data?.targetPopulationScope || "",
                description: data?.description || "",
                scope: data?.scope || "",
                cost: data?.cost || 0,
                currencyId: data?.currency?.id || "",
                strategicLineId: data?.strategicLine?.id || "",
                coreProcessId: data?.coreProcess?.id || "",
                estimatedStartDate: data?.estimatedStartDate
                    ? parse(data.estimatedStartDate, "dd/MM/yyyy", new Date())
                    : null,
                estimatedEndDate: data?.estimatedEndDate
                    ? parse(data.estimatedEndDate, "dd/MM/yyyy", new Date())
                    : null,
                finished: data?.finished || false,
                // members: [],
            }}>
            <FormInput name="name" label="Nombre del proyecto" className="col-span-full" />
            <FormTextArea name="description" label="Descripción del proyecto" className="col-span-full" />
            <FormTextArea name="backgroundDetails" label="Antecedentes" className="col-span-full" />
            <FormTextArea name="targetPopulationScope" label="Grupo de población a impactar" className="col-span-full" />
            <FormTextArea name="scope" label="Alcance" className="col-span-full" />
            <FormRelation name="currencyId" label="Divisa" module="currency" />
            <FormInputInt name="cost" label="Costo" props={{ type: "number" }} />
            <FormRelation name="strategicLineId" label="Línea estratégica" module="strategicLine" />
            <FormRelation name="coreProcessId" label="Proceso misional" module="coreProcess" />
            <FormDatePicker name="estimatedEndDate" label="Fecha de inicio estimada" />
            <FormDatePicker name="estimatedStartDate" label="Fecha de finalización estimada" />
            <FormSwitch name="finished" label="Concluir proyecto" />
    
            {/* <FormFieldArray
                className="col-span-full"
                name="members"
                label="Miembros del proyecto"
                columns={[]}
                fetchUrl={data?.id ? `${apiUrl}/projectApiUser/search/project/${data?.id}` : undefined}
                defaultItem={{
                    id: "",
                    apiUser: { id: "" },
                    project: { id: "" }
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`members.${index}.apiUser`} module="apiUser" />,
                ]}
            /> */}
        </FormLayout>
    )
}