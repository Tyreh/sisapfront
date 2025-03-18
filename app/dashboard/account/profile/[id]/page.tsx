import { secureFetch } from "@/secure-fetch";
import { Label } from "@/components/ui/label";
import { getNestedValue, resolveRedirectPath } from "@/lib/utils";
import React from "react";
import Link from "next/link";

import PageContainer from "@/components/layout/page-container";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const response = await secureFetch(`${process.env.API_URL}/account/profile${id ? `?id=${id}` : ''}`);

    if (response.status !== 200) {

    }

    return (
        <PageContainer>
            <div className="flex flex-1 flex-col space-y-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Información de {response.data.fullName.split(' ')[0]}</h3>
                    </div>
                
                </div>
                <div className="flex flex-col">
                    <div className="w-full grid grid-cols-1 gap-4 p-4 border rounded-lg">
                        {response.metadata.fields.map(field => {
                            const nestedPath = field.nestedValue || field.field;
                            const fieldValue = getNestedValue(response.data, nestedPath);
                            const redirectPath = field.redirect ? resolveRedirectPath(field.redirect, response.data) : null;

                            return (
                                <div key={field.field} className="col-span-1">
                                    <Label className="font-semibold">{field.label}</Label>
                                    <div className="rounded-lg px-3 py-2 bg-muted mt-2 break-words whitespace-normal h-10">
                                        {redirectPath ? (
                                            <Link className="text-primary hover:text-opacity-90 hover:underline" href={`/dashboard/${redirectPath}`}>{fieldValue}</Link>
                                        ) : (
                                            fieldValue
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}