"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";
import FormTextArea from "../ui/form/form-text-area";

export function StrategicLineForm({ module, data }: FormBaseProps) {
    const schema = z
        .object({
            name: z.string(),
            startYear: z.preprocess(
                (val) => {
                    if (typeof val === "string" && val.trim() !== "") {
                        const parsed = parseInt(val, 10);
                        return isNaN(parsed) ? val : parsed;
                    }
                    return val;
                },
                z
                    .number()
                    .int()
                    .min(2000, { message: "El año debe ser mínimo 2000" })
                    .max(3000, { message: "El año debe ser máximo 3000" })
            ),
            endYear: z.preprocess(
                (val) => {
                    if (typeof val === "string" && val.trim() !== "") {
                        const parsed = parseInt(val, 10);
                        return isNaN(parsed) ? val : parsed;
                    }
                    return val;
                },
                z
                    .number()
                    .int()
                    .min(2000, { message: "El año debe ser mínimo 2000" })
                    .max(3000, { message: "El año debe ser máximo 3000" })
            ),
            description: z.string(),
        })
        .refine(
            (data) => data.startYear < data.endYear,
            {
                message: "El año de inicio debe ser menor que el año de fin",
                path: ["endYear"],
            }
        );

    return (
        <FormLayout
            id={data?.id || undefined}
            module={module}
            schema={schema}
            defaultValues={{
                name: data?.name || "",
                description: data?.description || "",
                startYear: data?.startYear || undefined,
                endYear: data?.endYear || undefined
            }}
        >
            <FormInput name="name" label="Nombre" className="col-span-full" />
            <FormInput name="startYear" label="Año de inicio" props={{ type: "number" }} />
            <FormInput name="endYear" label="Año de fin" props={{ type: "number" }} />
            <FormTextArea name="description" label="Descripción" className="col-span-full" />
        </FormLayout>
    )
}