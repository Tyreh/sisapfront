import ViewRelationLayout from "@/components/view/detail/view-relation-layout";
import ViewDetailLayout from "@/components/view/detail/view-detail-layout";
import { secureFetch } from "@/secure-fetch";
import { redirect } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ProjectIssueForm } from "@/components/form/project-issue-form";

export default async function Page(props: { params: Promise<{ module: string; id: string }> }) {
    const params = await props.params;
    const { module, id } = params;
    const response = await secureFetch(`${process.env.API_URL}/${module}/${id}`, { cache: "no-store" });

    let responseIssues;
    if (module === "project") {
        responseIssues = await secureFetch(`${process.env.API_URL}/projectIssue/project/${response.data.id}`, { cache: "no-store" });
        //console.log(responseIssues.data);
    }

    if (response.status !== 200) {
        redirect("/dashboard");
    }

    return (
        <ViewDetailLayout module={module} id={id} metadata={response.metadata} data={response.data} title={response?.data?.title}>
            {response.metadata.entity.relations && response.metadata.entity.relations.map((relation: string, index: React.Key | null | undefined) =>
                <ViewRelationLayout key={index} module={relation} id={id} />
            )}
            {module === 'project' &&
                <React.Fragment>
                    <Separator className="col-span-full" />
                    <div className="col-span-full">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <h3 className="font-semibold">Avances del proyecto</h3>
                            </div>

                            <div className="flex flex-nowrap">
                                <ProjectIssueForm apiUrl={process.env.API_URL || ""} module="projectIssue" data={null} projectId={response.data.id} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 col-span-full">
                        {responseIssues.data.map((issue, index) => {
                            return (
                                <div key={index}>
                                    <ProjectIssueForm apiUrl={process.env.API_URL || ""} module="projectIssue" data={issue} projectId={response.data.id} />
                                </div>
                            )
                        })}
                    </div>
                </React.Fragment>
            }
        </ViewDetailLayout>
    );
}
