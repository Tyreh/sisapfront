"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, infer as zInfer } from "zod";
import { secureFetch } from "@/secure-fetch";

interface Props<T extends ZodType<any, any>> {
    schema: T;
    defaultValues: zInfer<T>;
    id?: string;
    module: string;
    onSubmit?: (data: zInfer<T>) => Promise<any>;
    children: React.ReactNode;
}

export function FormLayout<T extends ZodType<any, any>>({
    schema,
    defaultValues,
    module,
    id,
    onSubmit,
    children
}: Props<T>) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<zInfer<T>>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onBlur",
        reValidateMode: "onBlur"
    });

    const onSubmitForm = async (data: zInfer<T>) => {
        setLoading(true);
        let response;
        if (onSubmit) {
            response = await onSubmit(data);
        } else {
            response = await secureFetch(`/${module}${id ? `/${id}` : ''}`, {
                method: id ? 'PATCH' : 'POST',
                body: JSON.stringify(data)
            });
        }

        if (response.status !== 200) {
            if (response.errors) {
                response.errors.forEach((err: { field: string; message: string }) => {
                    form.setError(err.field, {
                        type: "server",
                        message: err.message
                    });
                });
            }

            const errorMessages =
                response.errors?.map((err: { message: string }) => `• ${err.message}`).join("<br>") ||
                response.message;

            toast({
                variant: "destructive",
                title: "¡Ups!",
                description: <div dangerouslySetInnerHTML={{ __html: errorMessages }} />,
                duration: 3000
            });

            setLoading(false);
            return;
        }

        toast({
            title: "🎉 ¡Todo listo!",
            description: "Los cambios han sido guardados correctamente.",
            duration: 3000
        });

        router.push(`/dashboard/${module}/${response.id}`);
        router.refresh();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
                <div className="flex justify-end flex-1 flex-row col-span-full space-x-4">
                    {!loading && (
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full md:w-fit"
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </Button>
                    )}
                    <Button loading={loading} type="submit" className="w-full md:w-fit">
                        Guardar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
