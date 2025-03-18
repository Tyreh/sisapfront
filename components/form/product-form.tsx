"use client"

import { FormBaseProps } from "@/app/dashboard/[module]/edit/page";
import FormFieldArray from "@/components/ui/form/form-field-array";
import FormFileInput from "@/components/ui/form/form-file-input";
import FormTextArea from "@/components/ui/form/form-text-area";
import FormRelation from "@/components/ui/form/form-relation";
import { FormLayout } from "@/components/ui/form/form-layout";
import FormInput from "@/components/ui/form/form-input";
import { z } from "zod";

export function ProductForm({ apiUrl, module, data }: FormBaseProps) {
    const ProductSchema = z.object({
        id: z.string().optional(),
        code: z.string()
            .max(8, "El código del producto no puede exceder los 8 caracteres.")
            .min(1, "El código del producto es obligatorio y no puede estar vacío.")
            .regex(/^[a-zA-Z0-9]+$/, "El código solo puede contener letras y números, sin espacios ni símbolos."),
        name: z.string()
            .max(160, "El nombre del producto no puede exceder los 160 caracteres.")
            .min(1, "El nombre del producto es obligatorio y no puede estar vacío."),
        category: z.object({
            value: z.string(),
            label: z.string(),
        }, { required_error: "Este campo es obligatorio." }),
        details: z.string().optional(),
        prices: z.array(
            z.object({
                id: z.string().optional(),
                product: z.object({
                    id: z.string().optional(),
                }),
                priceList: z.object({
                    id: z.string().optional(),
                }),
                price: z.coerce.number().min(1, "El precio es obligatorio."),
            })
        ),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    }


    return (
        <FormLayout module={module} apiUrl={apiUrl} schema={ProductSchema} defaultValues={{ id: data?.id || "", name: data?.name || "", nit: data?.nit || "" }} onSubmit={onSubmit}>
            <FormInput name="code" label="Código" />
            <FormInput name="name" label="Nombre" />
            <FormRelation apiUrl={apiUrl} name="category" label="Categoría" module="productCategory" />
            <FormFileInput name="image" label="Imagen" maxFiles={1} multiple={false} />
            <FormTextArea name="details" label="Detalles adicionales" className="col-span-full" />
            <FormFieldArray
                className="col-span-full"
                name="prices"
                label="Precios"
                columns={["Categoría", "Valor"]}
                defaultItem={{
                    product: { id: "" },
                    priceList: { id: "" },
                    price: 1
                }}
                cells={[
                    (index) => <FormRelation apiUrl={apiUrl} name={`prices.${index}.priceList`} module="priceList" />,
                    (index) => <FormInput name={`prices.${index}.price`} />,
                ]}
            />
        </FormLayout>
    )
}