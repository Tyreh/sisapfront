import { ProjectIssueForm } from "@/components/form/project-issue-form";
import PageContainer from "@/components/layout/page-container";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    if (!id) {
        notFound();
    }

    return (
        <PageContainer>
            <div className="flex flex-1 flex-col space-y-2 pb-14">
                <ProjectIssueForm projectId={id} />
            </div>
        </PageContainer>
    )


}