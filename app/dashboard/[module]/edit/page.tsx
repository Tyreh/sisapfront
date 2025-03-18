import ViewEditLayout from "@/components/view/edit/view-edit-layout";
import { secureFetch } from "@/secure-fetch";
import { redirect } from "next/navigation";
import { DependencyForm } from "@/components/form/dependency-form";
import { CurrencyForm } from "@/components/form/currency-form";
import { ProjectForm } from "@/components/form/project-form";
import { CoreProcessForm } from "@/components/form/core-process-form";
import { StrategicLineForm } from "@/components/form/strategic-line-form";
import { ApiUserForm } from "@/components/form/api-user-form";
import { RoleForm } from "@/components/form/role-form";
import React from "react";

export interface FormBaseProps {
    apiUrl: string;
    module: string;
    data: any;
}

export default async function Page(props: { params: Promise<any>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const { module } = params;
    const { id } = await props.searchParams;

    const response = await secureFetch(`${process.env.API_URL}/${module}${id ? `/${id}` : ''}`);

    if (response.status !== 200) {
        redirect("/dashboard");
    }

    const formComponents: { [key: string]: React.FC<{ apiUrl: string; module: string; id?: string }> } = {
        dependency: DependencyForm,
        currency: CurrencyForm,
        project: ProjectForm,
        coreProcess: CoreProcessForm,
        strategicLine: StrategicLineForm,
        apiUser: ApiUserForm,
        role: RoleForm
    };

    const FormComponent = formComponents[module];

    return (
        <ViewEditLayout metadata={response.metadata} id={id} title={response?.data?.title}>
            {FormComponent ? <FormComponent apiUrl={process.env.API_URL!} module={module} data={id ? response.data : null} /> : <p>Formulario no disponible</p>}
        </ViewEditLayout>
    );
}
