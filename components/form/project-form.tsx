"use client"

import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormRelation from "../ui/form/form-relation";
import { FormLayout } from "../ui/form/form-layout";
import FormSwitch from "../ui/form/form-switch";
import FormTextArea from "../ui/form/form-text-area";
import FormInputInt from "../ui/form/form-input-int";
import FormFieldArray from "../ui/form/form-field-array";
import { secureFetch } from "@/secure-fetch";

interface Props {
    apiUrl: string;
    module: string;
    data: any;
}

export function ProjectForm({ apiUrl, module, data }: Props) {
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
        // start date
        // end date
    });

    // const onSubmitForm = async (data: any) => {
    //     const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
    //         method: data?.id ? 'PATCH' : 'POST',
    //         body: JSON.stringify(data)
    //     });

    //     const response = await secureFetch(`${apiUrl}/${module}${data?.id ? `/${data.id}` : ''}`, {
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     });
    // }

    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={Schema} defaultValues={{
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
        }}>
            <FormInput name="name" label="Nombre del proyecto" />
            <FormTextArea name="backgroundDetails" label="Antecedentes" />
            <FormTextArea name="targetPopulationScope" label="Grupo de población a impactar" />
            <FormTextArea name="description" label="Descripción del proyecto" />
            <FormTextArea name="scope" label="Alcance" />
            <FormInputInt name="cost" label="Costo" props={{ type: "number" }} />
            <FormRelation apiUrl={apiUrl} name="currency" label="Divisa" module="currency" />
            <FormRelation apiUrl={apiUrl} name="strategicLine" label="Línea estratégica" module="strategicLine" />
            <FormRelation apiUrl={apiUrl} name="coreProcess" label="Proceso misional" module="coreProcess" />
            <FormRelation apiUrl={apiUrl} name="projectStatus" label="Estado" module="projectStatus" />
            {/* <FormFieldArray
                className="col-span-full"
                name="members"
                label="Miembros del proyecto"
                columns={["Usuario"]}
                defaultItem={{
                    apiUser: { id: "" },
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`members.${index}.apiUser`} module="apiUser" />,
                ]}
            /> */}
        </FormLayout>
    )
}