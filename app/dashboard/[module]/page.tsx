import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import ViewListTable, { ViewConfigDefinition } from "@/components/view/list/view-list-table";
import { cn } from "@/lib/utils";
import { secureFetch } from "@/secure-fetch";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ module: string }> }) {
    const params = await props.params;
    const { module } = params;
    const response = await secureFetch(`/${module}/search`);
    const responsePreferences = await secureFetch(`/account/preferences`);

    if (response.status !== 200) {
        notFound();
    }

    const config: ViewConfigDefinition = {
        entity: response.metadata.entity,
        module: module,
        fields: response.metadata.fields
    }

    return (
        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h3 className="hidden md:block font-semibold">Lista de {response.metadata.plural}</h3>
                    <div className="flex flex-nowrap space-x-4 justify-between items-center w-full sm:w-fit">
                        <Link href={`/dashboard/${module}/edit`} className={cn(buttonVariants({ "size": "sm" }), 'text-xs md:text-sm')}>
                            <Plus className='mr-2 h-4 w-4' /> Crear {response.metadata.singular}
                        </Link>
                    </div>
                </div>
                <ViewListTable config={config} currentPreferences={responsePreferences.data.preferences} />
            </div>
        </PageContainer>
    );
}
