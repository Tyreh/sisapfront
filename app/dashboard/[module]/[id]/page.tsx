import ViewDetailLayout from "@/components/view/detail/view-detail-layout";
import { secureFetch } from "@/secure-fetch";
import { redirect } from "next/navigation";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ module: string; id: string }> }) {
    const params = await props.params;
    const { module, id } = params;
    const response = await secureFetch(`/${module}/${id}`, { cache: "no-store" });

    // let responseIssues = null;
    // const issueFilesMap: Record<string, any[]> = {};

    // if (module === "project") {
    //     responseIssues = await secureFetch(`/projectIssue/project/${response.data.id}`, { cache: "no-store" });

    //     if (responseIssues?.data?.length > 0) {
    //         const fileRequests = await Promise.all(
    //             responseIssues.data.map(async (issue: any) => {
    //                 const fileRes = await secureFetch(`/storage/files/issue/${issue.id}`, { cache: "no-store" });
    //                 return { issueId: issue.id, files: fileRes?.data || [] };
    //             })
    //         );

    //         fileRequests.forEach(({ issueId, files }) => {
    //             issueFilesMap[issueId] = files;
    //         });
    //     }
    // }

    if (response.status !== 200) {
        redirect("/dashboard");
    }

    const extraActions = [
        <Link className={buttonVariants({ variant: "default" })} key="addIssue" href={`/dashboard/project/issue/${id}`}>Cargar Avances</Link>
        // <ProjectIssueForm
        //     key="issueForm" 
        //     data={null}
        //     projectId={response.data.id}
        //     files={[]}
        // />,
    ];

    return (
        <ViewDetailLayout
            module={module}
            response={response}
            extraActions={module === 'project' ? extraActions : undefined}
        >
            {/* {module === 'project' &&
                <React.Fragment>
                    <Separator className="col-span-full" />
                    <div className="col-span-full">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <h3 className="font-semibold">Avances del proyecto</h3>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 col-span-full">
                        {response.data.issues.map((issue: any, index: number) => {
                            return (
                                <div key={index}>
                                    <ProjectIssueForm
                                        data={issue}
                                        projectId={response.data.id}
                                        files={[]}
                                    // files={issueFilesMap[issue.id] || []}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </React.Fragment>
            } */}

        </ViewDetailLayout>
    );
}
