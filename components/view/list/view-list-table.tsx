'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/sticky-table";
import { Filter, ViewListTableFilters } from "@/components/view/list/view-list-table-filters";
import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect, useState } from "react";
import { secureFetch } from "@/secure-fetch";
import { getNestedValue, resolveRedirectPath } from "@/lib/utils";
import Link from "next/link";
import { ViewListPagination } from "./view-list-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ViewListHeader from "./view-list-header";
import { Skeleton } from "@/components/ui/skeleton";
import ViewListActions from "./view-list-actions";
import { nanoid } from "nanoid";

interface TableProps {
    apiUrl: string;
    config: ViewConfigDefinition;
    currentPreferences: any;
}

export interface ViewConfigField {
    field: string;
    nestedValue: string;
    showInList: boolean;
    label: string;
    showInDetail: boolean;
    type: string;
    redirect?: string;
    sortable: boolean;
    sortKey?: string;
}

export interface ViewConfigEntity {
    plural: string;
    singular: string;
    filters?: string[];
}


export interface ViewConfigDefinition {
    entity: ViewConfigEntity;
    module: string;
    fields: ViewConfigField[];
}

function renderColumnValue(column: ViewConfigField, value: any) {
    switch (column.type) {
        case 'IMAGE':
            return <img src={value} alt="Imagen" width="50" />;
        case 'CURRENCY':
            // return `$${value.toFixed(2)}`;
            return `$${value}`;
        default:
            return value;
    }
}

const usePreferences = (defaultPreferences) => {
    const [preferences, setPreferences] = useState(defaultPreferences);

    const updatePreference = (key, value) => {
        setPreferences((prev) => {
            const updatedPreferences = { ...prev };

            if (value === "" || value === null || value === undefined) {
                // Si el valor está vacío, elimina la preferencia
                delete updatedPreferences[key];
            } else {
                updatedPreferences[key] = value;
            }

            return updatedPreferences;
        });
    };

    return { preferences, setPreferences, updatePreference };
};

export default function ViewListTable({ apiUrl, config, currentPreferences }: TableProps) {
    // preferences
    const [query, setQuery] = useState<string>(currentPreferences?.[`${config.module}-vlq`] || "");
    const [sortColumn, setSortColumn] = useState<string | null>(currentPreferences?.[`${config.module}-vlsc`] || null);
    const [sortOrder, setSortOrder] = useState<string | null>(currentPreferences?.[`${config.module}-vls`] || null);
    const [pageSize, setPageSize] = useState<number>(currentPreferences?.[`${config.module}-vlps`] || 25);
    const [page, setPage] = useState<number>(currentPreferences?.[`${config.module}-vlp`] || 0);
    const { preferences, setPreferences, updatePreference } = usePreferences(currentPreferences || {});
    // preferences
    const [metadata, setMetadata] = useState<{ fields?: any[] }>({});
    const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
    const [filters, setFilters] = useState<Filter[]>(currentPreferences?.[`${config.module}-vlf`] || []);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const fetchData = async () => {
        setLoading(true);
        await secureFetch(`${apiUrl}/account/preferences`, {
            method: "PUT",
            body: JSON.stringify({ preferences }),
        });
        let endpoint = `${apiUrl}/${config.module}/search?`;
        if (query !== "") endpoint += `query=${query}&`;
        filters.forEach(filter => {
            endpoint += `${filter.name}=${filter.value}&`;
        })
        if (sortColumn && sortOrder) endpoint += `sort=${sortColumn},${sortOrder}&`;
        endpoint += `size=${pageSize}&`;
        endpoint += `page=${page}&`;
        const response = await secureFetch(endpoint);
        setData(response.data.content);
        setMetadata(response.metadata);
        setPage(response.data.pageable.pageNumber);
        setPages(response.data.totalPages);
        setPageSize(response.data.size);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [apiUrl, config.module, sortOrder, sortColumn, query, page, pageSize, filters])

    return (
        <div className='flex flex-1 flex-col space-y-4'>
            <ViewListTableFilters
                filters={filters}
                setFilters={setFilters}
                moduleName={config.module}
                query={query}
                setQuery={setQuery}
                setPage={setPage}
                updatePreference={updatePreference}
                filterEndpoints={config.entity.filters}
                apiUrl={apiUrl}
            />

            <div className='relative flex flex-1'>
                <div className='absolute bottom-0 left-0 right-0 top-0 flex overflow-scroll rounded-md border md:overflow-auto'>
                    <ScrollArea className="flex-1">
                        {loading ?
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {Array.from({ length: 5 }).map(() => (
                                            <TableHead key={nanoid()}>
                                                <Skeleton className="h-4 w-full" />
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.from({ length: 10 }).map(() => (
                                        <TableRow key={nanoid()}>
                                            {Array.from({ length: 5 }).map(() => (
                                                <TableCell key={nanoid()}><Skeleton className="h-4 w-full" /></TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            :
                            <Table className="relative">
                                <ViewListHeader
                                    module={config.module}
                                    updatePreference={updatePreference}
                                    fields={metadata.fields || []}
                                    setSortColumn={setSortColumn}
                                    setSortOrder={setSortOrder}
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    hiddenColumns={hiddenColumns}
                                    setHiddenColumns={setHiddenColumns}
                                />

                                <TableBody>
                                    {data.map((item: any) =>
                                        <TableRow key={nanoid()}>
                                            {config.fields.filter(field => field.showInList && !hiddenColumns.has(field.field)).map(field => {
                                                const nestedPath = field.nestedValue || field.field;
                                                const fieldValue = getNestedValue(item, nestedPath);
                                                const redirectPath = field.redirect ? resolveRedirectPath(field.redirect, item) : null;
                                                return (
                                                    <TableCell key={`${item.id}-${field.field}`}>
                                                        {redirectPath ? (
                                                            <Link className="text-primary hover:text-opacity-90 hover:underline" href={`/dashboard/${redirectPath}`}>
                                                                {fieldValue}
                                                            </Link>
                                                        ) : (
                                                            fieldValue
                                                        )}
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell>
                                                <ViewListActions
                                                    id={item.id}
                                                    module={config.module}
                                                    apiUrl={apiUrl}
                                                    onSuccess={() => fetchData()}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        }
                        <ScrollBar orientation='horizontal' />
                    </ScrollArea>
                </div>

            </div>
            <ViewListPagination moduleName={config.module} updatePreference={updatePreference} page={page} pageSize={pageSize} pages={pages} setPage={setPage} setPageSize={setPageSize} />
        </div>
    );

}