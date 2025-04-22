import PageContainer from "@/components/layout/page-container";

interface Props {
    children?: React.ReactNode;
    response: any;
}

export default function ViewEditLayout({ response, children }: Props) {
    return (
        <PageContainer>
            <div className="flex flex-1 flex-col space-y-2">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{response.data?.id ? 'Editar' : 'Crear'} {response.metadata.singular}</h3>
                </div>
                {children}
            </div>
        </PageContainer>
    );
}