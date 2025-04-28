import { Label } from "@/components/ui/label";
import { getNestedValue, resolveRedirectPath } from "@/lib/utils";
import { ChevronDown, CirclePlus, Trash2 } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteAction from "@/components/view/delete-action";
import PageContainer from "@/components/layout/page-container";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AuditLog from "@/app/dashboard/[module]/[id]/audit-log";
import { secureFetch } from "@/secure-fetch";
import { toast } from "@/hooks/use-toast";
import { ViewDetailFileType } from "./view-detail-file-type";
import { ViewDetailSingleFileType } from "./ViewDetailSingleFileType";

interface Props {
    module: string;
    response: {
        data: any;
        metadata: {
            plural: string;
            singular: string;
            fields: FieldMetadata[]
        }
        audits?: any;
    }
    children?: React.ReactNode;
    extraActions?: React.ReactNode[];
}

export interface FieldMetadata {
    name: string;
    type: string;
    label: string;
    nestedField: string;
    renderOrder: number;
    redirect: string;
    metadata: any;
    expand: boolean;
}

export default function ViewDetailLayout({ module, response, extraActions, children }: Props) {
    const imageFields = response.metadata.fields.filter((field: FieldMetadata) => field.type === 'IMAGE');
    const arrayFieldsWithMetadata = response.metadata.fields
        .filter((field: FieldMetadata) => field.type === "ARRAY")
        .map((field: FieldMetadata) => ({
            ...field,
            data: response.data[field.name],
        }));


    return (
        <PageContainer>
            <div className="flex flex-1 flex-col space-y-2 pb-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Detalles de {response.metadata.singular}</h3>
                    </div>

                    <div className="flex flex-nowrap">
                        {
                            extraActions &&
                            <div className="pe-2">
                                {extraActions.map((action, index) => (
                                    <React.Fragment key={index}>
                                        {action}
                                    </React.Fragment>
                                ))}
                            </div>
                        }

                        <Link href={`/dashboard/${module}/edit?id=${response.data.id}`} className={`${buttonVariants({ variant: "default" })} rounded-e-none`}>
                            Editar
                        </Link>

                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" className="rounded-s-none">
                                        <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <Link href={`/dashboard/${module}/edit`}>
                                            <DropdownMenuItem>
                                                <CirclePlus />
                                                <span>Crear {response.metadata.singular}</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <DialogTrigger className="w-full">
                                            <DropdownMenuItem>
                                                <Trash2 />
                                                Eliminar {response.metadata.singular}
                                            </DropdownMenuItem>
                                        </DialogTrigger>

                                        {/* {extraActions && extraActions.map((action, index) => (
                                            <React.Fragment key={index}>
                                                {action}
                                            </React.Fragment>
                                        ))} */}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DeleteAction moduleName={module} id={response.data.id} />
                        </Dialog>
                    </div>
                </div>
                <div className={`flex flex-col ${imageFields.length > 0 ? 'md:flex-row gap-4' : ''}`}>
                    {imageFields.length > 0 && (
                        <div className="w-full md:w-1/5 p-4 border rounded-lg flex flex-col items-center">
                            {imageFields.map((field: FieldMetadata) =>
                                <div key={field.name} className="mb-4">
                                    <Label className="font-semibold">{field.label}</Label>
                                    <img
                                        src={getNestedValue(response.data, field.name)}
                                        alt={field.label}
                                        className="w-full h-auto rounded-lg mt-2"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className={`w-full ${imageFields.length > 0 ? 'md:w-4/5' : ''} grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg`}>
                        {[...response.metadata.fields]
                            .filter((field: FieldMetadata) => field.type !== 'IMAGE' && field.type !== 'ARRAY')
                            .sort((a, b) => a.renderOrder - b.renderOrder)
                            .map(field => {
                                // const nestedField = field.nestedField || field.name
                                // const fieldValue = getNestedValue(response.data, nestedField)

                                const fieldValue = field.nestedField
                                    ? getNestedValue(response.data[field.name], field.nestedField)
                                    : getNestedValue(response.data, field.name)
                                const redirectPath = field.redirect ? resolveRedirectPath(field.redirect, response.data) : null;

                                return (
                                    <div key={field.name} className={`col-span-1 ${field.expand ? `md:col-span-full` : ''}`}>
                                        <Label className="font-semibold">{field.label}</Label>
                                        <div className="rounded-lg px-3 py-2 bg-muted mt-2 break-words whitespace-normal min-h-10">
                                            {field.type === 'BOOLEAN' ?
                                                fieldValue ? 'Si' : 'No'
                                                : redirectPath ? (
                                                    <Link className="text-primary hover:text-opacity-90 hover:underline" href={`/dashboard/${redirectPath}`}>{fieldValue}</Link>
                                                ) : (
                                                    fieldValue
                                                )}
                                        </div>
                                    </div>
                                );
                            })}

                        {arrayFieldsWithMetadata.map((field) => (
                            <div key={field.name} className="col-span-full">
                                <Label className="font-semibold">{field.label}</Label>
                                <div className="rounded-lg border mt-2">
                                    <Table>
                                        {field.metadata?.fields?.length > 0 ? (
                                            <>
                                                <TableHeader>
                                                    <TableRow>
                                                        {field.metadata.fields.map((subField: any, idx: any) => (
                                                            <TableHead key={idx}>{subField.label}</TableHead>
                                                        ))}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {field.data.length > 0 ? (
                                                        field.data.map((item: any, rowIndex: number) => (
                                                            <TableRow key={rowIndex}>
                                                                {field.metadata.fields.map((subField: any) => {
                                                                    const value = getNestedValue(item, subField.name);

                                                                    // Si es un array de objetos (=> archivos)
                                                                    if (
                                                                        Array.isArray(value) &&
                                                                        value.length > 0 &&
                                                                        typeof value[0] === "object"
                                                                    ) {
                                                                        return (
                                                                            <TableCell
                                                                                key={`${rowIndex}-${subField.name}`}
                                                                            >
                                                                                <ViewDetailFileType
                                                                                    files={value}
                                                                                />
                                                                            </TableCell>
                                                                        );
                                                                    }

                                                                    // Campo plano FILE
                                                                    if (subField.type === "FILE") {
                                                                        return (
                                                                            <TableCell
                                                                                key={`${rowIndex}-${subField.name}`}
                                                                            >
                                                                                <ViewDetailSingleFileType fileName={String(value ?? "")} />
                                                                            </TableCell>
                                                                        );
                                                                    }

                                                                    // Resto de campos
                                                                    const redirectPath = field.redirect
                                                                        ? resolveRedirectPath(field.redirect, item)
                                                                        : null;
                                                                    return (
                                                                        <TableCell
                                                                            key={`${rowIndex}-${subField.name}`}
                                                                        >
                                                                            {redirectPath ? (
                                                                                <Link
                                                                                    className="text-primary hover:text-opacity-90 hover:underline"
                                                                                    href={`/dashboard${redirectPath}`}
                                                                                >
                                                                                    {value}
                                                                                </Link>
                                                                            ) : (
                                                                                String(value ?? "")
                                                                            )}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={field.metadata.fields.length}
                                                                className="h-24 text-center"
                                                            >
                                                                No se encontró ningún resultado
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </>
                                        ) : (
                                            <TableBody>
                                                {field.data.length > 0 ? (
                                                    field.data.map((value: any, idx: number) => (
                                                        <TableRow key={idx}>
                                                            <TableCell>{String(value)}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell className="h-24 text-center">
                                                            No se encontró ningún resultado
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        )}
                                    </Table>
                                </div>
                            </div>
                        ))}




                        {children}
                    </div>
                </div>

                <AuditLog audits={response.audits} />
            </div>
        </PageContainer>
    );
}